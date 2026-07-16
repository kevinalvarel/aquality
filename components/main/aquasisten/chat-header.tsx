"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  messageCount: number;
  onClearChat: () => void;
  className?: string;
}

export function ChatHeader({ className }: ChatHeaderProps) {
  return (
    <div className={cn("shrink-0", className)}>
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Title & status */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-xl",
              "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
              "ring-1 ring-primary/10",
            )}
          >
            <Bot className="size-5 text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-foreground tracking-tight">
                Aquasisten
              </h1>
              <Badge
                variant="outline"
                className="gap-1 border-primary/20 text-primary text-[10px] px-1.5 py-0"
              >
                <Sparkles className="size-2.5" />
                Beta
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
