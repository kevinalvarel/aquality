"use client";

import { useCallback, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { ChatMessage } from "@/types/aquasisten.type";
import { SendMessageSchema } from "@/types/aquasisten.type";
import { toast } from "sonner";

export function useAquasistenChat() {
  const timestampsRef = useRef<Record<string, Date>>({});

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
    onError: (err) => {
      toast.error("Gagal mendapatkan respons", {
        description: err.message || "Terjadi kesalahan pada server.",
      });
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const sendMessage = useCallback(
    async (input: string) => {
      // Validate with Zod
      const parsed = SendMessageSchema.safeParse({ message: input });
      if (!parsed.success) {
        const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
        toast.error(errorMsg);
        return;
      }

      try {
        await sendChatMessage({
          text: parsed.data.message,
        });
      } catch (err) {
        console.error("Error sending message:", err);
      }
    },
    [sendChatMessage],
  );

  const clearChat = useCallback(() => {
    stop();
    setMessages([]);
    toast.success("Riwayat chat telah dihapus");
  }, [stop, setMessages]);

  const dismissError = useCallback(() => {
    // In useChat, error is handled via toast. No need for additional state.
  }, []);

  const chatMessages = useMemo((): ChatMessage[] => {
    return messages.map((m) => {
      // Extract text content from parts
      const textContent = m.parts
        .filter((part) => part.type === "text")
        .map((part) => (part as any).text)
        .join("");

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
  };
}
