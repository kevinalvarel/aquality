"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ActivityRecommendation } from "@/types/weather.type";
import { Compass } from "lucide-react";

interface ActivityRecommendationsProps {
  activities: ActivityRecommendation[];
}

const statusConfig = {
  safe: {
    badge: "✅",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    label: "Aman",
  },
  warning: {
    badge: "⚠️",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    label: "Hati-hati",
  },
  danger: {
    badge: "❌",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-400",
    label: "Hindari",
  },
};

export function ActivityRecommendations({
  activities,
}: ActivityRecommendationsProps) {
  if (activities.length === 0) return null;

  return (
    <Card className="border-border/50 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/15">
            <Compass className="size-4 text-emerald-400" />
          </div>
          Aktivitas yang Direkomendasikan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activities.map((activity) => {
            const config = statusConfig[activity.status];
            return (
              <div
                key={activity.name}
                className={`group flex items-start gap-3 rounded-lg border ${config.border} ${config.bg} p-3 transition-all duration-200 hover:shadow-sm`}
              >
                <span className="mt-0.5 text-lg leading-none flex-shrink-0">
                  {activity.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <span className="text-xs">{config.badge}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    {activity.reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
