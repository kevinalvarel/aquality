"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db, chatConversations, chatMessages } from "@/db";
import { eq, desc, asc } from "drizzle-orm";

/**
 * Get the current authenticated user's ID
 */
async function getUserId(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

/**
 * Fetch all chat conversations for the current logged-in user
 */
export async function getConversationsAction() {
  try {
    const userId = await getUserId();
    const list = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.userId, userId))
      .orderBy(desc(chatConversations.updatedAt));
    
    return {
      success: true,
      data: list,
    };
  } catch (error) {
    const e = error as Error;
    console.error("Error fetching conversations:", e);
    return {
      success: false,
      error: e.message,
      data: [],
    };
  }
}

/**
 * Fetch all messages for a specific conversation
 */
export async function getConversationMessagesAction(conversationId: string) {
  try {
    const userId = await getUserId();
    
    // Security check: ensure the conversation belongs to the user
    const [conversation] = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.id, conversationId))
      .limit(1);

    if (!conversation) {
      throw new Error("Percakapan tidak ditemukan");
    }

    if (conversation.userId !== userId) {
      throw new Error("Akses ditolak");
    }

    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(asc(chatMessages.createdAt));

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    const e = error as Error;
    console.error("Error fetching messages:", e);
    return {
      success: false,
      error: e.message,
      data: [],
    };
  }
}

/**
 * Delete a specific conversation
 */
export async function deleteConversationAction(conversationId: string) {
  try {
    const userId = await getUserId();

    // Security check: ensure the conversation belongs to the user
    const [conversation] = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.id, conversationId))
      .limit(1);

    if (!conversation) {
      throw new Error("Percakapan tidak ditemukan");
    }

    if (conversation.userId !== userId) {
      throw new Error("Akses ditolak");
    }

    // Delete conversation (cascade will delete messages)
    await db
      .delete(chatConversations)
      .where(eq(chatConversations.id, conversationId));

    return {
      success: true,
      message: "Percakapan berhasil dihapus",
    };
  } catch (error) {
    const e = error as Error;
    console.error("Error deleting conversation:", e);
    return {
      success: false,
      error: e.message,
    };
  }
}

/**
 * Create a new conversation
 */
export async function createConversationAction(title: string, idInput?: string) {
  try {
    const userId = await getUserId();
    const id = idInput || crypto.randomUUID();

    const [conversation] = await db
      .insert(chatConversations)
      .values({
        id,
        userId,
        title: title || "Percakapan Baru",
      })
      .returning();

    return {
      success: true,
      data: conversation,
    };
  } catch (error) {
    const e = error as Error;
    console.error("Error creating conversation:", e);
    return {
      success: false,
      error: e.message,
    };
  }
}
