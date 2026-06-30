"use client";

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

export function DashboardSummaryCards() {
  const cards: DashboardKPICardProps[] = [
    {
      title: "Total Analyses",
      value: "152",
      icon: <BarChart3 className="size-4" />,
      trend: { direction: "up", label: "+12 this week" },
    },
    {
      title: "Healthy Beaches",
      value: "124",
      icon: <CheckCircle2 className="size-4" />,
      badge: {
        label: "81.6%",
        className: "bg-success/15 text-success border border-success/30",
      },
      trend: { direction: "up", label: "+5 since last week" },
    },
    {
      title: "Need Attention",
      value: "18",
      icon: <AlertTriangle className="size-4" />,
      badge: {
        label: "Warning",
        className: "bg-warning/15 text-warning border border-warning/30",
      },
      trend: { direction: "down", label: "3 new alerts" },
    },
    {
      title: "Average AI Confidence",
      value: "96%",
      icon: <Brain className="size-4" />,
      progress: 96,
      trend: { direction: "up", label: "Consistently above 95%" },
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
