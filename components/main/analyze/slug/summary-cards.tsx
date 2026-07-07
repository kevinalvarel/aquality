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
  Droplets,
  Brain,
  AlertTriangle,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
  progress?: number;
  trend?: string;
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  progress,
  trend,
}: SummaryCardProps) {
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
            <Badge variant={badge.variant} className={badge.className}>
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
              <p>Keyakinan: {progress}%</p>
            </TooltipContent>
          </Tooltip>
        )}
        {subtitle && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {trend && <TrendingUp className="size-3 text-success" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function SummaryCards() {
  const cards: SummaryCardProps[] = [
    {
      title: "Kualitas Air",
      value: "Baik",
      icon: <Droplets className="size-4" />,
      badge: {
        label: "Baik",
        variant: "default",
        className: "bg-success text-success-foreground",
      },
      subtitle: "Meningkat dari analisis terakhir",
      trend: "up",
    },
    {
      title: "Keyakinan AI",
      value: "97%",
      icon: <Brain className="size-4" />,
      progress: 97,
      subtitle: "Deteksi akurasi tinggi",
    },
    {
      title: "Tingkat Polusi",
      value: "Rendah",
      icon: <AlertTriangle className="size-4" />,
      badge: {
        label: "Rendah",
        variant: "default",
        className: "bg-success/15 text-success border border-success/30",
      },
      subtitle: "Di bawah ambang batas aman",
      trend: "up",
    },
    {
      title: "Analisis Terakhir",
      value: "30 Juni 2026",
      icon: <Calendar className="size-4" />,
      subtitle: "Baru saja",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </div>
  );
}
