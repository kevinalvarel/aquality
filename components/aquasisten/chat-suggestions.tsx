"use client";

import type { SuggestedPrompt } from "@/lib/aquasisten/types";
import { cn } from "@/lib/utils";
import { Waves, TreePine, Droplets, MapPin } from "lucide-react";

const SUGGESTIONS: SuggestedPrompt[] = [
  {
    icon: "waves",
    label: "Analisis Abrasi",
    prompt: "Bagaimana kondisi abrasi pantai di wilayah pesisir utara saat ini?",
  },
  {
    icon: "tree",
    label: "Kesehatan Mangrove",
    prompt:
      "Tunjukkan analisis kesehatan mangrove berdasarkan citra satelit terbaru.",
  },
  {
    icon: "droplets",
    label: "Kualitas Air",
    prompt:
      "Bagaimana hasil pemantauan kualitas air di stasiun-stasiun pengamatan?",
  },
  {
    icon: "map",
    label: "Data Geospasial",
    prompt: "Tampilkan ringkasan data geospasial lingkungan pesisir terkini.",
  },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  waves: <Waves className="size-4" />,
  tree: <TreePine className="size-4" />,
  droplets: <Droplets className="size-4" />,
  map: <MapPin className="size-4" />,
};

interface ChatSuggestionsProps {
  onSelect: (prompt: string) => void;
  className?: string;
}

export function ChatSuggestions({ onSelect, className }: ChatSuggestionsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-2", className)}>
      {SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion.label}
          type="button"
          onClick={() => onSelect(suggestion.prompt)}
          className={cn(
            "group/suggestion flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-3.5",
            "text-left transition-all duration-200",
            "hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm",
            "dark:bg-card/30 dark:hover:bg-primary/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          )}
        >
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg",
              "bg-primary/10 text-primary transition-colors",
              "group-hover/suggestion:bg-primary/20",
            )}
          >
            {ICON_MAP[suggestion.icon]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground leading-tight">
              {suggestion.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {suggestion.prompt}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
