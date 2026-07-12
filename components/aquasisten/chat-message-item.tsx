"use client";

import { ChatMessageAvatar } from "./chat-message-avatar";
import type { ChatMessage } from "@/lib/aquasisten/types";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  message: ChatMessage;
  className?: string;
}

/**
 * Renders simple inline markdown: **bold** and *italic*.
 */
function renderContent(text: string) {
  // Split by bold (**...**) and italic (*...*)
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\n)/g);
  return parts.map((part, i) => {
    if (part === "\n") {
      return <br key={i} />;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function ChatMessageItem({ message, className }: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "group flex gap-3 px-1",
        isUser ? "flex-row-reverse" : "flex-row",
        className,
      )}
    >
      <ChatMessageAvatar role={message.role} />

      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-1",
          isUser ? "items-end" : "items-start",
        )}
      >
        {/* Bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            "transition-colors duration-200",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : cn(
                  "bg-muted/60 text-foreground rounded-bl-md",
                  "dark:bg-muted/40",
                  message.isStreaming && "animate-pulse",
                ),
          )}
        >
          {message.content ? (
            <div className="whitespace-pre-wrap break-words">
              {renderContent(message.content)}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full bg-current opacity-40"
                  style={{
                    animation: "aqua-bounce 1.4s ease-in-out infinite",
                    animationDelay: `${i * 0.16}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span
          className={cn(
            "text-[10px] text-muted-foreground/60 transition-opacity",
            "opacity-0 group-hover:opacity-100",
            isUser ? "pr-1" : "pl-1",
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
