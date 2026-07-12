import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "../schema";

export const chatConversations = pgTable("chat_conversations", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
