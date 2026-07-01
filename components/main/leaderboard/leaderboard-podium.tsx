"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BeachLeaderboard } from "@/types/leaderboard";
import { Bot, Crown } from "lucide-react";
import { getStatusColor } from "@/components/main/leaderboard/utils";

interface LeaderboardPodiumProps {
  topBeaches: BeachLeaderboard[];
}

const podiumConfig = [
  {
    rank: 2,
    medal: "🥈",
    label: "2nd Place",
    cardClass: "order-1 lg:order-0",
    ringClass: "ring-chart-2/30",
    badgeClass: "bg-chart-2/10 text-chart-2",
    height: "h-24",
  },
  {
    rank: 1,
    medal: "🥇",
    label: "1st Place",
    cardClass: "order-0 lg:order-1",
    ringClass: "ring-warning/40",
    badgeClass: "bg-warning/10 text-warning",
    height: "h-32",
    crown: true,
  },
  {
    rank: 3,
    medal: "🥉",
    label: "3rd Place",
    cardClass: "order-2",
    ringClass: "ring-orange-500/20",
    badgeClass: "bg-orange-500/10 text-orange-600",
    height: "h-20",
  },
];

export function LeaderboardPodium({ topBeaches }: LeaderboardPodiumProps) {
  if (topBeaches.length < 3) return null;

  return (
    <section id="leaderboard-podium" className="space-y-4">
      <h2 className="text-lg font-semibold">Top Performers</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {podiumConfig.map((config) => {
          const beach = topBeaches[config.rank - 1];
          if (!beach) return null;
          const statusColor = getStatusColor(beach.status);

          return (
            <Link
              key={beach.id}
              href={`/analyze/${beach.slug}`}
              className={config.cardClass}
            >
              <Card
                className={`group relative cursor-pointer overflow-hidden ring-2 transition-all hover:shadow-lg hover:scale-[1.02] ${config.ringClass}`}
              >
                {/* Rank badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${config.badgeClass}`}
                  >
                    {config.crown && <Crown className="size-3" />}
                    {config.medal} {config.label}
                  </span>
                </div>

                {/* Image placeholder bar */}
                <div
                  className={`w-full bg-gradient-to-br from-primary/20 via-chart-2/15 to-primary/10 ${config.height}`}
                />

                <CardContent className="space-y-3 pt-3">
                  <div>
                    <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                      {beach.beachName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {beach.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-2xl font-bold">
                        {beach.environmentalScore}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Env. Score
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <Badge
                        variant="outline"
                        className={`border-none ${statusColor.bg} ${statusColor.text}`}
                      >
                        {beach.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Bot className="size-3" />
                        {beach.aiConfidence}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
