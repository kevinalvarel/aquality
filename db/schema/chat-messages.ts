import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { chatConversations } from "./chat-conversation";

export const chatMessages = pgTable("chat_messages", {
  id: text("id").primaryKey(),

  conversationId: text("conversation_id")
    .notNull()
    .references(() => chatConversations.id, {
      onDelete: "cascade",
    }),

  role: text("role", {
    enum: ["user", "assistant", "system"],
  }).notNull(),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
