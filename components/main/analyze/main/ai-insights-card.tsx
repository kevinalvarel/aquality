import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Sparkles, CheckCircle2 } from "lucide-react";
import type { DashboardStats } from "@/types/dashboard.type";

interface AIInsightsCardProps {
  stats: DashboardStats;
}

export function AIInsightsCard({ stats }: AIInsightsCardProps) {
  // Find most common status
  let mostCommonStatus = "Good";
  let maxCount = -1;
  for (const item of stats.statusDistribution) {
    if (item.count > maxCount) {
      maxCount = item.count;
      mostCommonStatus = item.status;
    }
  }

  // Count beaches requiring attention (Moderate/Poor)
  const attentionCount = stats.statusDistribution
    .filter((d) => d.status === "Moderate" || d.status === "Poor")
    .reduce((sum, d) => sum + d.count, 0);

  const insights = [
    `Most beaches analyzed are currently classified as ${mostCommonStatus}.`,
    "Water quality across monitored Banten beaches remains stable.",
    attentionCount > 0
      ? `${attentionCount} beach${
          attentionCount > 1 ? "es" : ""
        } require${
          attentionCount === 1 ? "s" : ""
        } closer monitoring due to lowered quality markers.`
      : "No beaches currently require urgent environmental intervention.",
    `AI classification confidence remains consistently high, averaging ${stats.averageConfidence}%.`,
  ];

  return (
    <Card className="relative overflow-hidden border-primary/20">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5" />
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Sparkles className="size-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">AI Insights</CardTitle>
            <CardDescription>
              Automatically generated analysis summary
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <ul className="space-y-3">
          {insights.map((insight) => (
            <li key={insight} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                {insight}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
