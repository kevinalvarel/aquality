"use client";

import { ChatMessageAvatar } from "./chat-message-avatar";
import { ChatSuggestions } from "./chat-suggestions";
import { Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatEmptyStateProps {
  onSelectSuggestion: (prompt: string) => void;
  className?: string;
}

export function ChatEmptyState({
  onSelectSuggestion,
  className,
}: ChatEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-4 py-8",
        className,
      )}
    >
      {/* Decorative icon */}
      <div className="relative mb-5">
        <div
          className={cn(
            "flex size-16 items-center justify-center rounded-2xl",
            "bg-gradient-to-br from-primary/15 via-primary/10 to-transparent",
            "ring-1 ring-primary/10",
          )}
        >
          <Bot className="size-8 text-primary" />
        </div>
        <span
          className={cn(
            "absolute -right-1 -top-1 flex size-6 items-center justify-center",
            "rounded-full bg-primary text-primary-foreground shadow-md",
          )}
        >
          <Sparkles className="size-3" />
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold text-foreground tracking-tight">
        Halo! Saya Aquasisten
      </h2>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground leading-relaxed">
        Asisten AI untuk membantu Anda menganalisis data lingkungan pesisir,
        kualitas air, dan ekosistem mangrove.
      </p>

      {/* Suggestions */}
      <div className="mt-8 w-full max-w-lg">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          Mulai dengan pertanyaan
        </p>
        <ChatSuggestions onSelect={onSelectSuggestion} />
      </div>
    </div>
  );
}
