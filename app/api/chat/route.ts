import { groq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db, chatConversations, chatMessages, beaches } from "@/db";
import { eq, ilike, or } from "drizzle-orm";

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

    // Extract text content safely from parts (AI SDK v7 format) or content (legacy)
    let userMessageContent = "";
    if (Array.isArray(lastUserMessage.parts)) {
      userMessageContent = lastUserMessage.parts
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");
    } else if (typeof lastUserMessage.content === "string") {
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

    // 3. Retrieve relevant beach data based on the user's message (simple keyword RAG)
    const beachContext = await getRelevantBeachContext(userMessageContent);

    // 4. Stream model response
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: `Kamu adalah Aquasisten, asisten AI resmi untuk platform Aquality.

              Aquality adalah platform pemantauan kesehatan kualitas air pantai di Provinsi Banten. Tujuan utama platform ini adalah membantu masyarakat, wisatawan, peneliti, dan pemerintah memahami kondisi kualitas air pantai berdasarkan data lingkungan serta memberikan edukasi mengenai faktor-faktor yang memengaruhi kesehatan perairan pesisir.

              Fokus keahlianmu meliputi:
              1. Analisis kualitas kesehatan air pantai.
              2. Interpretasi parameter kualitas air seperti:
                - Dissolved Oxygen (DO)
                - pH
                - Total Suspended Solids (TSS)
                - Nitrat
                - Fosfat
                - Suhu air
                - Salinitas
              3. Penjelasan status kualitas air (Baik, Sedang, Buruk) beserta dampaknya terhadap aktivitas manusia dan ekosistem.
              4. Hubungan antara aktivitas industri, limbah, pemukiman, dan kualitas air pesisir.
              5. Edukasi mengenai pencemaran perairan, konservasi lingkungan pesisir, serta rekomendasi menjaga kualitas air.
              6. Informasi mengenai pantai-pantai di Provinsi Banten berdasarkan data yang tersedia pada platform Aquality.

              Panduan respon:

              - Gunakan Bahasa Indonesia yang ramah, profesional, dan mudah dipahami.
              - Berikan jawaban yang ilmiah, objektif, dan berbasis data.
              - Jawablah secara ringkas dan langsung ke inti, kecuali pengguna meminta penjelasan lebih mendalam.
              - Gunakan markdown seperlunya agar jawaban mudah dibaca.
              - Jika tersedia data pantai pada konteks percakapan, gunakan data tersebut sebagai sumber utama jawaban. Sebutkan nama pantainya secara eksplisit dan jangan mengubah atau mengarang nilai yang tidak tersedia.
              - Jika pengguna bertanya mengenai kondisi suatu pantai yang tidak memiliki data pada konteks, jelaskan bahwa data spesifik belum tersedia, kemudian berikan penjelasan umum berdasarkan ilmu lingkungan.
              - Ketika menjelaskan kualitas air, sertakan interpretasi mengenai keamanan aktivitas seperti berenang, bermain air, memancing, wisata keluarga, atau aktivitas lainnya jika memang relevan dengan data yang tersedia.
              - Jika pengguna meminta rekomendasi pantai, prioritaskan pantai dengan kualitas air terbaik berdasarkan data yang tersedia pada platform.
              - Jika pengguna bertanya di luar ruang lingkup kualitas air, lingkungan pesisir, atau data pantai, tetap bantu menjawab menggunakan pengetahuan umum tanpa mengklaim memiliki data Aquality.

              Hal yang perlu dipahami:

              - Provinsi Banten merupakan salah satu kawasan industri terbesar di Indonesia sehingga beberapa wilayah pesisir memiliki tingkat tekanan lingkungan yang berbeda-beda.
              - Kedekatan pantai dengan kawasan industri tidak selalu berarti kualitas airnya buruk, namun merupakan salah satu faktor yang perlu dipertimbangkan bersama parameter kualitas air lainnya.
              - Hindari membuat kesimpulan tanpa didukung data.
              - Jangan mengarang angka, status kualitas air, maupun hasil analisis apabila data tidak tersedia.

${beachContext ? `\n### Data Pantai Relevan (dari database):\n${beachContext}\n` : ""}`,
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

/**
 * Simple keyword-based retrieval: cari nama pantai yang disebut di pesan user,
 * lalu ambil data lengkapnya dari tabel `beaches`.
 */
async function getRelevantBeachContext(userMessage: string): Promise<string> {
  try {
    const allBeaches = await db.select().from(beaches);

    if (allBeaches.length === 0) return "";

    const lowerMessage = userMessage.toLowerCase();

    // 1. Coba cocokkan nama pantai yang disebut langsung di pesan
    const mentionedBeaches = allBeaches.filter((beach: any) =>
      lowerMessage.includes(beach.name.toLowerCase()),
    );

    // 2. Jika tidak ada yang cocok tapi user menyinggung topik pesisir umum,
    //    kirim ringkasan singkat semua pantai sebagai fallback context
    const beachesToUse =
      mentionedBeaches.length > 0 ? mentionedBeaches : allBeaches.slice(0, 5);

    return beachesToUse
      .map((beach: any) => formatBeachData(beach))
      .join("\n\n---\n\n");
  } catch (error) {
    console.error("Error fetching beach context:", error);
    return "";
  }
}

function formatBeachData(beach: any): string {
  const lines: string[] = [`**${beach.name}**`];

  if (beach.region) lines.push(`- Wilayah: ${beach.region}`);
  if (beach.province) lines.push(`- Provinsi: ${beach.province}`);
  if (beach.latitude && beach.longitude)
    lines.push(`- Koordinat: ${beach.latitude}, ${beach.longitude}`);
  if (beach.erosionRate !== undefined && beach.erosionRate !== null)
    lines.push(`- Laju abrasi: ${beach.erosionRate} m/tahun`);
  if (
    beach.mangroveHealthIndex !== undefined &&
    beach.mangroveHealthIndex !== null
  )
    lines.push(
      `- Indeks kesehatan mangrove (NDVI): ${beach.mangroveHealthIndex}`,
    );
  if (beach.waterQualityStatus)
    lines.push(`- Status kualitas air: ${beach.waterQualityStatus}`);
  if (beach.description) lines.push(`- Deskripsi: ${beach.description}`);
  if (beach.lastSurveyDate)
    lines.push(`- Survei terakhir: ${beach.lastSurveyDate}`);

  return lines.join("\n");
}
