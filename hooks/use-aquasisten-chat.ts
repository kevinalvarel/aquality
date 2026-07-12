"use client";

import { useState, useCallback, useRef } from "react";
import type { ChatMessage, ChatState } from "@/lib/aquasisten/types";
import { SendMessageSchema } from "@/lib/aquasisten/types";
import { sendMessageAction } from "@/lib/aquasisten/actions";
import { toast } from "sonner";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useAquasistenChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  // Abort controller for cancelling in-flight requests
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (input: string) => {
    // Validate with Zod
    const parsed = SendMessageSchema.safeParse({ message: input });
    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
      toast.error(errorMsg);
      return;
    }

    // Cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: parsed.data.message,
      timestamp: new Date(),
    };

    const assistantPlaceholder: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, assistantPlaceholder],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await sendMessageAction({ message: parsed.data.message });

      if (!response.success || !response.content) {
        throw new Error(response.error ?? "Respons kosong dari server.");
      }

      const fullContent = response.content;

      // Simulate streaming effect (word by word)
      const words = fullContent.split(" ");
      let accumulated = "";

      for (let i = 0; i < words.length; i++) {
        accumulated += (i === 0 ? "" : " ") + words[i];
        const currentContent = accumulated;

        setState((prev) => ({
          ...prev,
          messages: prev.messages.map((m) =>
            m.id === assistantPlaceholder.id
              ? { ...m, content: currentContent }
              : m,
          ),
        }));

        // Small delay between words for streaming effect
        await new Promise((resolve) => setTimeout(resolve, 25));
      }

      // Mark streaming as complete
      setState((prev) => ({
        ...prev,
        messages: prev.messages.map((m) =>
          m.id === assistantPlaceholder.id
            ? { ...m, isStreaming: false, timestamp: new Date() }
            : m,
        ),
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan yang tidak terduga.";

      // Remove the placeholder and show error
      setState((prev) => ({
        ...prev,
        messages: prev.messages.filter(
          (m) => m.id !== assistantPlaceholder.id,
        ),
        isLoading: false,
        error: errorMessage,
      }));

      toast.error("Gagal mendapatkan respons", {
        description: errorMessage,
      });
    }
  }, []);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setState({ messages: [], isLoading: false, error: null });
    toast.success("Riwayat chat telah dihapus");
  }, []);

  const dismissError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
    dismissError,
  };
}
