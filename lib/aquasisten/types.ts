import * as z from "zod";

// ─── Message Role ──────────────────────────────────────────────
export type MessageRole = "user" | "assistant";

// ─── Chat Message ──────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// ─── Chat State ────────────────────────────────────────────────
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

// ─── Suggested Prompt ──────────────────────────────────────────
export interface SuggestedPrompt {
  icon: string;
  label: string;
  prompt: string;
}

// ─── Zod schema for message payload validation ─────────────────
export const SendMessageSchema = z.object({
  message: z
    .string()
    .min(1, "Pesan tidak boleh kosong")
    .max(2000, "Pesan terlalu panjang (maks 2000 karakter)"),
});

export type SendMessagePayload = z.infer<typeof SendMessageSchema>;

// ─── Server action response ────────────────────────────────────
export interface AquasistenResponse {
  success: boolean;
  content?: string;
  error?: string;
}
