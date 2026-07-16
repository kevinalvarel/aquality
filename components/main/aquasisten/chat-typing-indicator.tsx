"use client";

import { cn } from "@/lib/utils";

export function ChatTypingIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-1.5 px-1 py-0.5", className)}
      aria-label="Aquasisten sedang mengetik"
      role="status"
    >
      <span className="text-xs text-muted-foreground font-medium">
        Aquasisten sedang mengetik
      </span>
      <span className="flex items-center gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-primary/60"
            style={{
              animation: "aqua-bounce 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </span>

      {/* Inline keyframes — no globals.css modification needed */}
      <style>{`
        @keyframes aqua-bounce {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
