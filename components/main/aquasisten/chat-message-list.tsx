"use client";

import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessageItem } from "./chat-message-item";
import { ChatEmptyState } from "./chat-empty-state";
import { ChatTypingIndicator } from "./chat-typing-indicator";
import type { ChatMessage } from "@/types/aquasisten.type";
import { cn } from "@/lib/utils";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSelectSuggestion: (prompt: string) => void;
  onSend?: (message: string) => void;
  className?: string;
}

export function ChatMessageList({
  messages,
  isLoading,
  onSelectSuggestion,
  onSend,
  className,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <ScrollArea className={cn("flex-1 [&>div>div]:min-h-full", className)}>
        <ChatEmptyState
          onSelectSuggestion={onSelectSuggestion}
          onSend={onSend || (() => {})}
          isLoading={isLoading}
          className="min-h-full"
        />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="flex flex-col gap-4 px-4 py-4 md:px-6">
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}

        {/* Typing indicator shown when loading and last message is not already streaming */}
        {isLoading &&
          messages.length > 0 &&
          !messages[messages.length - 1]?.isStreaming && (
            <ChatTypingIndicator className="pl-11" />
          )}

        {/* Scroll anchor */}
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </ScrollArea>
  );
}
