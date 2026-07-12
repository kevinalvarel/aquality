"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BeachLeaderboard } from "@/types/leaderboard.type";
import {
  Bot,
  Droplets,
  Trash2,
  TreePalm,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import { parseMarkdown } from "@/lib/parse-markdown";

const statusLabels: Record<string, string> = {
  excellent: "Sangat Baik",
  good: "Baik",
  moderate: "Sedang",
  poor: "Buruk",
};

interface LeaderboardSheetProps {
  beach: BeachLeaderboard | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const metrics = [
  {
    key: "aiConfidence" as const,
    label: "Skor Industri",
    icon: Bot,
    color: "text-chart-2",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-chart-2",
  },
  {
    key: "waterClarity" as const,
    label: "Skor Kepadatan Penduduk",
    icon: Droplets,
    color: "text-primary",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-primary",
  },
  {
    key: "pollutionLevel" as const,
    label: "Skor Pengaruh Urban",
    icon: AlertTriangle,
    color: "text-warning",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-warning",
  },
  {
    key: "shorelineCleanliness" as const,
    label: "Skor Bebas Dampak Industri",
    icon: TreePalm,
    color: "text-success",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-success",
  },
  {
    key: "wasteDetection" as const,
    label: "Indeks Pengaruh Urban",
    icon: Trash2,
    color: "text-destructive",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-destructive",
    inverted: true,
  },
];

export function LeaderboardSheet({
  beach,
  open,
  onOpenChange,
}: LeaderboardSheetProps) {
  if (!beach) return null;

  const statusColor = getStatusColor(beach.status);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <ScrollArea className="h-full">
          {/* Image Header */}
          <div className="relative h-40 w-full bg-gradient-to-br from-primary/20 via-chart-2/15 to-primary/10" />

          <SheetHeader className="px-5 pt-4 pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <SheetTitle className="text-lg">{beach.beachName}</SheetTitle>
                <SheetDescription>{beach.location}</SheetDescription>
              </div>
              <Badge
                variant="outline"
                className={`border-none ${statusColor.bg} ${statusColor.text}`}
              >
                {statusLabels[beach.status.toLowerCase()] || beach.status}
              </Badge>
            </div>
          </SheetHeader>

          <div className="px-5 space-y-5 pb-4">
            {/* Score display */}
            <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{beach.environmentalScore}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Skor Lingk.
                </p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="flex-1">
                <Progress
                  value={beach.environmentalScore}
                  className="h-2.5 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-primary [&_[data-slot=progress-indicator]]:to-success"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Kualitas lingkungan secara keseluruhan
                </p>
              </div>
            </div>

            {beach.narasi_rekomendasi && (
              <>
                <Separator />
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
                  <h4 className="text-sm font-semibold flex items-center gap-1.5 text-primary">
                    <Bot className="size-4" />
                    Rekomendasi & Analisis AI
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {parseMarkdown(beach.narasi_rekomendasi)}
                  </p>
                </div>
              </>
            )}

            <Separator />

            {/* Metrics breakdown */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Rincian Skor</h4>
              {metrics.map((metric) => {
                const Icon = metric.icon;
                const value = beach[metric.key] ?? 0;
                const displayLabel =
                  metric.key === "wasteDetection"
                    ? `${value}/100`
                    : `${value}%`;

                return (
                  <div key={metric.key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon className={`size-3.5 ${metric.color}`} />
                        <span className="text-muted-foreground">
                          {metric.label}
                        </span>
                      </div>
                      <span className="font-medium tabular-nums">
                        {displayLabel}
                      </span>
                    </div>
                    <Progress
                      value={value}
                      className={`h-1.5 ${metric.progressColor}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <SheetFooter className="px-5 pb-5">
            <Button asChild className="w-full">
              <Link href={`/explore/${beach.slug}`}>
                <ExternalLink className="size-3.5" data-icon="inline-start" />
                Lihat Analisis Lengkap
              </Link>
            </Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
