import type { BeachStatus } from "@/types/leaderboard";

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
