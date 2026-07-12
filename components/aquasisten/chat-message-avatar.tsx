"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { MessageRole } from "@/lib/aquasisten/types";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageAvatarProps {
  role: MessageRole;
  className?: string;
}

export function ChatMessageAvatar({ role, className }: ChatMessageAvatarProps) {
  const isAssistant = role === "assistant";

  return (
    <Avatar
      className={cn(
        "shrink-0 select-none",
        isAssistant && "ring-2 ring-primary/20",
        className,
      )}
    >
      <AvatarFallback
        className={cn(
          "text-xs font-semibold",
          isAssistant
            ? "bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
            : "bg-muted text-muted-foreground",
        )}
      >
        {isAssistant ? (
          <Bot className="size-4" />
        ) : (
          <User className="size-4" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
