import type { BeachStatus } from "@/types/leaderboard.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Leaderboard
export function getStatusColor(status: BeachStatus): {
  bg: string;
  text: string;
  dot: string;
} {
  switch (status) {
    case "Excellent":
      return {
        bg: "bg-success/10",
        text: "text-success",
        dot: "bg-success",
      };
    case "Good":
      return {
        bg: "bg-chart-2/10",
        text: "text-chart-2",
        dot: "bg-chart-2",
      };
    case "Moderate":
      return {
        bg: "bg-warning/10",
        text: "text-warning",
        dot: "bg-warning",
      };
    case "Poor":
      return {
        bg: "bg-destructive/10",
        text: "text-destructive",
        dot: "bg-destructive",
      };
  }
}

export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(dateString: string): string {
  const d = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return formatDate(dateString);
}

export function extractStatusFromExplanation(penjelasan: string | undefined | null): string {
  if (!penjelasan) return "TIDAK DIKETAHUI";
  
  // Example: memiliki kelayakan lingkungan **SANGAT BAIK (Lestari)**
  const matchEnv = penjelasan.match(/kelayakan lingkungan \*\*([^*]+)\*\*/i);
  if (matchEnv) {
    return matchEnv[1];
  }
  
  // Fallback: look for the first bold pattern
  const matchBold = penjelasan.match(/\*\*([^*]+)\*\*/);
  if (matchBold) {
    return matchBold[1];
  }
  
  return "TERANALISIS";
}

