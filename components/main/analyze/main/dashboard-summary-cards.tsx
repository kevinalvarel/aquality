import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Brain,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { DashboardStats } from "@/types/dashboard.type";

interface DashboardKPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  badge?: {
    label: string;
    className: string;
  };
  progress?: number;
  trend?: {
    direction: "up" | "down";
    label: string;
  };
}

function DashboardKPICard({
  title,
  value,
  icon,
  badge,
  progress,
  trend,
}: DashboardKPICardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          {badge && (
            <Badge variant="default" className={badge.className}>
              {badge.label}
            </Badge>
          )}
        </div>
        {progress !== undefined && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{progress}% average confidence</p>
            </TooltipContent>
          </Tooltip>
        )}
        {trend && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {trend.direction === "up" ? (
              <TrendingUp className="size-3 text-success" />
            ) : (
              <TrendingDown className="size-3 text-warning" />
            )}
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardSummaryCardsProps {
  stats: DashboardStats;
}

export function DashboardSummaryCards({ stats }: DashboardSummaryCardsProps) {
  const excellentCount = stats.statusDistribution.find(d => d.status === "Excellent")?.count ?? 0;
  const goodCount = stats.statusDistribution.find(d => d.status === "Good")?.count ?? 0;
  const moderateCount = stats.statusDistribution.find(d => d.status === "Moderate")?.count ?? 0;
  const poorCount = stats.statusDistribution.find(d => d.status === "Poor")?.count ?? 0;

  const healthyCount = excellentCount + goodCount;
  const attentionCount = moderateCount + poorCount;
  const totalDist = excellentCount + goodCount + moderateCount + poorCount;
  const healthyPercentage = totalDist > 0 ? Math.round((healthyCount / totalDist) * 100) : 0;

  const cards: DashboardKPICardProps[] = [
    {
      title: "Total Analyses",
      value: stats.totalAnalyses.toString(),
      icon: <BarChart3 className="size-4" />,
      trend: { direction: "up", label: "Across Banten region" },
    },
    {
      title: "Healthy Beaches",
      value: healthyCount.toString(),
      icon: <CheckCircle2 className="size-4" />,
      badge: {
        label: `${healthyPercentage}%`,
        className: "bg-success/15 text-success border border-success/30",
      },
      trend: { direction: "up", label: "Excellent / Good status" },
    },
    {
      title: "Need Attention",
      value: attentionCount.toString(),
      icon: <AlertTriangle className="size-4" />,
      badge: {
        label: attentionCount > 0 ? "Warning" : "Secure",
        className: attentionCount > 0 
          ? "bg-warning/15 text-warning border border-warning/30" 
          : "bg-success/15 text-success border border-success/30",
      },
      trend: { 
        direction: attentionCount > 0 ? "down" : "up", 
        label: "Moderate / Poor status" 
      },
    },
    {
      title: "Average AI Confidence",
      value: `${stats.averageConfidence}%`,
      icon: <Brain className="size-4" />,
      progress: stats.averageConfidence,
      trend: { direction: "up", label: "Quality assessment confidence" },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <DashboardKPICard key={card.title} {...card} />
      ))}
    </div>
  );
}
