import { groq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db, chatConversations, chatMessages } from "@/db";
import { eq } from "drizzle-orm";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const { messages, conversationId } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response("Messages are required", { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1];

    // Extract text content safely from content property
    let userMessageContent = "";
    if (typeof lastUserMessage.content === "string") {
      userMessageContent = lastUserMessage.content;
    } else if (Array.isArray(lastUserMessage.content)) {
      userMessageContent = lastUserMessage.content
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");
    }

    let currentConversationId = conversationId;

    // 1. Create a conversation if it doesn't exist yet
    if (!currentConversationId) {
      const title = userMessageContent.slice(0, 50) || "Percakapan Baru";
      currentConversationId = crypto.randomUUID();

      await db.insert(chatConversations).values({
        id: currentConversationId,
        userId,
        title,
      });
    }

    // 2. Save user message to database
    const userMessageId = crypto.randomUUID();
    await db.insert(chatMessages).values({
      id: userMessageId,
      conversationId: currentConversationId,
      role: "user",
      content: userMessageContent,
    });

    // 3. Stream model response
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: `Kamu adalah Aquasisten, asisten AI cerdas untuk platform Aquality.
Tugas utama kamu adalah membantu pengguna menganalisis dan memantau kondisi lingkungan pesisir, laut, dan perairan.
Fokus keahlian kamu meliputi:
1. Analisis abrasi pantai (erosi pesisir, perubahan garis pantai, mitigasi dengan tanggul alami/buatan).
2. Pemantauan ekosistem mangrove (kesehatan vegetasi pesisir, pemetaan satelit NDVI, restorasi mangrove).
3. Pemantauan kualitas air (DO/Disolved Oxygen, pH, TSS/Total Suspended Solids, fosfat, nitrat, suhu, dan salinitas).
4. Data geospasial lingkungan pesisir.

Panduan respon:
- Gunakan Bahasa Indonesia yang ramah, profesional, informatif, dan mudah dipahami.
- Berikan penjelasan ilmiah yang akurat namun tetap praktis dan solutif.
- Gunakan markdown formatting secara bijak (tebal, miring, poin-poin/list, tabel, atau blok kutipan) agar jawaban mudah dibaca.
- Jika pengguna bertanya tentang data spesifik daerah (misalnya Pantai Sawarna, Tanjung Lesung, Carita, dll.), kaitkan dengan relevansi kondisi pesisir wilayah Banten/Jawa Barat jika sesuai.
- Jawablah dengan ringkas dan to-the-point kecuali jika pengguna meminta penjelasan mendalam.`,
      messages: await convertToModelMessages(messages),
      onFinish: async (event) => {
        try {
          const assistantMessageId = crypto.randomUUID();
          await db.insert(chatMessages).values({
            id: assistantMessageId,
            conversationId: currentConversationId,
            role: "assistant",
            content: event.text,
          });

          await db
            .update(chatConversations)
            .set({ updatedAt: new Date() })
            .where(eq(chatConversations.id, currentConversationId));
        } catch (dbError) {
          console.error("Error saving assistant message to DB:", dbError);
        }
      },
    });

    const streamResponse = result.toUIMessageStreamResponse();

    return new Response(streamResponse.body, {
      status: streamResponse.status,
      statusText: streamResponse.statusText,
      headers: {
        ...Object.fromEntries(streamResponse.headers.entries()),
        "x-conversation-id": currentConversationId,
      },
    });
  } catch (error) {
    console.error("POST /api/chat error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
