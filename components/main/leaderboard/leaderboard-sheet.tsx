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
import type { BeachLeaderboard } from "@/types/leaderboard";
import { Bot, Droplets, Trash2, TreePalm, AlertTriangle, ExternalLink } from "lucide-react";
import { getStatusColor } from "./utils";

interface LeaderboardSheetProps {
  beach: BeachLeaderboard | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const metrics = [
  {
    key: "waterClarity" as const,
    label: "Water Clarity",
    icon: Droplets,
    color: "text-primary",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-primary",
  },
  {
    key: "pollutionLevel" as const,
    label: "Pollution Level",
    icon: AlertTriangle,
    color: "text-warning",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-warning",
    inverted: true,
  },
  {
    key: "shorelineCleanliness" as const,
    label: "Shoreline Cleanliness",
    icon: TreePalm,
    color: "text-success",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-success",
  },
  {
    key: "wasteDetection" as const,
    label: "Waste Detection",
    icon: Trash2,
    color: "text-destructive",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-destructive",
    inverted: true,
  },
  {
    key: "aiConfidence" as const,
    label: "AI Confidence",
    icon: Bot,
    color: "text-chart-2",
    progressColor: "[&_[data-slot=progress-indicator]]:bg-chart-2",
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
                {beach.status}
              </Badge>
            </div>
          </SheetHeader>

          <div className="px-5 space-y-5 pb-4">
            {/* Score display */}
            <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{beach.environmentalScore}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Env. Score
                </p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="flex-1">
                <Progress
                  value={beach.environmentalScore}
                  className="h-2.5 [&_[data-slot=progress-indicator]]:bg-gradient-to-r [&_[data-slot=progress-indicator]]:from-primary [&_[data-slot=progress-indicator]]:to-success"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Overall environmental quality
                </p>
              </div>
            </div>

            <Separator />

            {/* Metrics breakdown */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Score Breakdown</h4>
              {metrics.map((metric) => {
                const Icon = metric.icon;
                const value = beach[metric.key];
                const displayLabel = metric.inverted
                  ? `${value}% detected`
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
              <Link href={`/analyze/${beach.slug}`}>
                <ExternalLink className="size-3.5" data-icon="inline-start" />
                View Full Analysis
              </Link>
            </Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
