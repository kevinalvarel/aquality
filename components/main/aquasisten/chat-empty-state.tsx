"use client";

import { useState, useCallback, type KeyboardEvent } from "react";
import { Bot, Sparkles, SendHorizonal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatEmptyStateProps {
  onSelectSuggestion: (prompt: string) => void;
  onSend: (message: string) => void;
  isLoading: boolean;
  className?: string;
}

export function ChatEmptyState({
  onSelectSuggestion,
  onSend,
  isLoading,
  className,
}: ChatEmptyStateProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInputValue("");
  }, [inputValue, isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full",
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
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground leading-relaxed">
        Asisten AI untuk membantu Anda menganalisis data lingkungan pesisir,
        kualitas air, dan ekosistem mangrove.
      </p>

      {/* Centered Chat Input Card */}
      <div className="w-full max-w-lg mt-6 bg-card border border-border/60 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all p-3.5 dark:bg-card/30">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tanya sesuatu tentang abrasi, kualitas air, atau mangrove..."
          disabled={isLoading}
          rows={2}
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 max-h-32 min-h-[50px] pr-2 text-foreground"
        />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
          <span className="text-[10px] text-muted-foreground/50">
            Tekan Enter untuk kirim, Shift+Enter untuk baris baru
          </span>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="icon-sm"
            className={cn(
              "rounded-lg transition-colors bg-primary text-primary-foreground hover:bg-primary/90",
              inputValue.trim() && !isLoading ? "shadow-sm hover:shadow" : "",
            )}
            aria-label="Kirim pesan"
          >
            {isLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <SendHorizonal className="size-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
