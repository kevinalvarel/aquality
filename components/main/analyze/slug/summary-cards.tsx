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
  TrendingDown,
} from "lucide-react";
import type { BeachApiResponse } from "@/types/beach-api.type";

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
  trend?: "up" | "down" | "stable";
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
              <p>Skor: {progress}%</p>
            </TooltipContent>
          </Tooltip>
        )}
        {subtitle && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {trend === "up" && <TrendingUp className="size-3 text-success" />}
            {trend === "down" && <TrendingDown className="size-3 text-destructive" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface SummaryCardsProps {
  data: BeachApiResponse;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const isSehat = data.status_kualitas_2026.toUpperCase() === "SEHAT";
  const isDampakRendah = data.kategori_dampak_industri.toUpperCase().includes("RENDAH");
  const isDampakSedang = data.kategori_dampak_industri.toUpperCase().includes("SEDANG");

  const cards: SummaryCardProps[] = [
    {
      title: "Kualitas Air",
      value: data.status_kualitas_2026,
      icon: <Droplets className="size-4" />,
      badge: {
        label: data.status_kualitas_2026,
        variant: isSehat ? "default" : "destructive",
        className: isSehat ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground",
      },
      subtitle: `Tren Kualitas: ${data.tren_kualitas}`,
      trend: data.tren_kualitas.toUpperCase() === "MEMBAIK" ? "up" : data.tren_kualitas.toUpperCase() === "MEMBURUK" ? "down" : "stable",
    },
    {
      title: "Skor Kesehatan",
      value: `${data.health_score}%`,
      icon: <Brain className="size-4" />,
      progress: data.health_score,
      subtitle: data.label_rekomendasi,
    },
    {
      title: "Dampak Industri",
      value: data.kategori_dampak_industri,
      icon: <AlertTriangle className="size-4" />,
      badge: {
        label: data.kategori_dampak_industri,
        variant: isDampakRendah ? "default" : isDampakSedang ? "secondary" : "destructive",
        className: isDampakRendah 
          ? "bg-success/15 text-success border border-success/30" 
          : isDampakSedang 
          ? "bg-warning/15 text-warning border border-warning/30"
          : "bg-destructive/15 text-destructive border border-destructive/30",
      },
      subtitle: `Indeks Dampak: ${data.indeks_dampak_industri}`,
    },
    {
      title: "Peringkat Pantai",
      value: `#${data.ranking}`,
      icon: <Calendar className="size-4" />,
      subtitle: "Dari 25 pantai terkelola",
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

