"use client";

import { useRef, useCallback, useState, type KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SendHorizonal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  className?: string;
}

export function ChatInput({ onSend, isLoading, className }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    // Re-focus textarea after send
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [value, isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // Expose a way for parent to set input value (for suggestions)
  const setInputValue = useCallback((text: string) => {
    setValue(text);
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, []);

  // Attach the setter to the component for parent access
  (ChatInput as any).__setInputValue = setInputValue;

  return (
    <div
      className={cn(
        "flex items-end gap-2 border-t border-border/60 bg-card/50 px-4 py-3 md:px-6",
        "dark:bg-card/30",
        className,
      )}
    >
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ketik pertanyaan tentang data lingkungan..."
        disabled={isLoading}
        rows={1}
        className={cn(
          "min-h-10 max-h-32 flex-1 resize-none rounded-xl border-border/50",
          "bg-background/80 text-sm placeholder:text-muted-foreground/60",
          "focus-visible:ring-primary/30",
          "dark:bg-background/50",
        )}
        aria-label="Ketik pesan untuk Aquasisten"
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleSend}
              disabled={!value.trim() || isLoading}
              size="icon"
              className={cn(
                "shrink-0 rounded-xl transition-all duration-200",
                value.trim() && !isLoading
                  ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
                  : "",
              )}
              aria-label="Kirim pesan"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <SendHorizonal className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{isLoading ? "Menunggu respons..." : "Kirim pesan (Enter)"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

// Re-export for parent to set input value
export type ChatInputHandle = {
  setValue: (text: string) => void;
};
