import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeaderboardSummary as LeaderboardSummaryData } from "@/types/leaderboard";
import { BarChart3, Hash, Award, Clock } from "lucide-react";

interface LeaderboardSummaryProps {
  summary: LeaderboardSummaryData;
}

const summaryCards = [
  {
    key: "totalBeaches" as const,
    label: "Total Beaches",
    icon: Hash,
    format: (v: number) => v.toString(),
    gradient: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    key: "averageScore" as const,
    label: "Avg. Environmental Score",
    icon: BarChart3,
    format: (v: number) => `${v}/100`,
    gradient: "from-chart-2/10 to-chart-2/5",
    iconColor: "text-chart-2",
  },
  {
    key: "highestScore" as const,
    label: "Highest Score",
    icon: Award,
    format: (v: number) => `${v}/100`,
    gradient: "from-success/10 to-success/5",
    iconColor: "text-success",
  },
  {
    key: "lastUpdated" as const,
    label: "Last Updated",
    icon: Clock,
    format: (_: number, date: string) => {
      const d = new Date(date);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    gradient: "from-warning/10 to-warning/5",
    iconColor: "text-warning",
  },
];

export function LeaderboardSummary({ summary }: LeaderboardSummaryProps) {
  return (
    <section
      id="leaderboard-summary"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
    >
      {summaryCards.map((card) => {
        const Icon = card.icon;
        const value =
          card.key === "lastUpdated"
            ? card.format(0, summary.lastUpdated)
            : card.format(summary[card.key] as number);

        return (
          <Card
            key={card.key}
            size="sm"
            className={`bg-gradient-to-br ${card.gradient}`}
          >
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <Icon className={`size-4 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold tracking-tight">{value}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
