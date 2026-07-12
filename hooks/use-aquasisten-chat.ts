"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChatMessage } from "@/types/aquasisten.type";
import { SendMessageSchema } from "@/types/aquasisten.type";
import { toast } from "sonner";
import {
  getConversationsAction,
  getConversationMessagesAction,
  deleteConversationAction,
  createConversationAction,
} from "@/servers/chat-action";

export function useAquasistenChat() {
  const timestampsRef = useRef<Record<string, Date>>({});
  
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [isConversationsLoading, setIsConversationsLoading] = useState(true);

  // Fetch all conversations for the user
  const refreshConversations = useCallback(async () => {
    setIsConversationsLoading(true);
    const res = await getConversationsAction();
    if (res.success) {
      setConversations(res.data);
    } else {
      toast.error("Gagal memuat riwayat chat");
    }
    setIsConversationsLoading(false);
  }, []);

  // Initial load of conversations
  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  const {
    messages,
    status,
    error,
    sendMessage: sendChatMessage,
    setMessages,
    stop,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish: () => {
      // Refresh the conversations in the sidebar
      refreshConversations();
    },
    onError: (err) => {
      toast.error("Gagal mendapatkan respons", {
        description: err.message || "Terjadi kesalahan pada server.",
      });
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const sendMessage = useCallback(
    async (input: string) => {
      const parsed = SendMessageSchema.safeParse({ message: input });
      if (!parsed.success) {
        const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
        toast.error(errorMsg);
        return;
      }

      try {
        let currentId = activeConversationId;
        
        // If it's a new chat, create the conversation first
        if (!currentId) {
          const tempId = crypto.randomUUID();
          const title = input.slice(0, 50) || "Percakapan Baru";
          
          const res = await createConversationAction(title, tempId);
          if (!res.success) {
            toast.error("Gagal membuat percakapan");
            return;
          }
          
          currentId = tempId;
          setActiveConversationId(currentId);
          refreshConversations();
        }

        await sendChatMessage(
          { text: parsed.data.message },
          { body: { conversationId: currentId } }
        );
      } catch (err) {
        console.error("Error sending message:", err);
      }
    },
    [sendChatMessage, activeConversationId, refreshConversations],
  );

  const selectConversation = useCallback(
    async (conversationId: string) => {
      stop();
      const res = await getConversationMessagesAction(conversationId);
      if (res.success) {
        setActiveConversationId(conversationId);
        const mapped = res.data.map((m) => {
          timestampsRef.current[m.id] = new Date(m.createdAt);
          return {
            id: m.id,
            role: m.role as "user" | "assistant",
            parts: [
              {
                type: "text" as const,
                text: m.content,
                state: "done" as const,
              },
            ],
          };
        });
        setMessages(mapped);
      } else {
        toast.error("Gagal memuat percakapan: " + res.error);
      }
    },
    [stop, setMessages],
  );

  const deleteConversation = useCallback(
    async (conversationId: string) => {
      const res = await deleteConversationAction(conversationId);
      if (res.success) {
        refreshConversations();
        if (activeConversationId === conversationId) {
          stop();
          setMessages([]);
          setActiveConversationId(null);
        }
      } else {
        toast.error("Gagal menghapus percakapan: " + res.error);
      }
    },
    [activeConversationId, refreshConversations, stop, setMessages],
  );

  const clearChat = useCallback(() => {
    stop();
    setMessages([]);
    setActiveConversationId(null);
    toast.success("Mulai percakapan baru");
  }, [stop, setMessages]);

  const dismissError = useCallback(() => {
    // Handled via toast
  }, []);

  const chatMessages = useMemo((): ChatMessage[] => {
    return messages.map((m) => {
      const textContent = m.parts
        ? m.parts
            .filter((part) => part.type === "text")
            .map((part: any) => part.text)
            .join("")
        : "";

      if (!timestampsRef.current[m.id]) {
        timestampsRef.current[m.id] = new Date();
      }

      return {
        id: m.id,
        role: m.role === "user" ? "user" : "assistant",
        content: textContent,
        timestamp: timestampsRef.current[m.id],
        isStreaming:
          isLoading &&
          m.role === "assistant" &&
          m.id === messages[messages.length - 1]?.id,
      };
    });
  }, [messages, isLoading]);

  return {
    messages: chatMessages,
    isLoading,
    error: error ? error.message : null,
    sendMessage,
    clearChat,
    dismissError,
    conversations,
    activeConversationId,
    selectConversation,
    deleteConversation,
    isConversationsLoading,
  };
}
