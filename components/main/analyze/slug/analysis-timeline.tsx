"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle2 } from "lucide-react";

interface TimelineItem {
  date: string;
  quality: string;
  confidence: number;
  qualityColor: string;
}

const timelineData: TimelineItem[] = [
  {
    date: "30 Jun 2026",
    quality: "Good",
    confidence: 97,
    qualityColor: "bg-success/15 text-success border border-success/30",
  },
  {
    date: "23 Jun 2026",
    quality: "Good",
    confidence: 94,
    qualityColor: "bg-success/15 text-success border border-success/30",
  },
  {
    date: "16 Jun 2026",
    quality: "Moderate",
    confidence: 89,
    qualityColor: "bg-warning/15 text-warning border border-warning/30",
  },
  {
    date: "09 Jun 2026",
    quality: "Good",
    confidence: 92,
    qualityColor: "bg-success/15 text-success border border-success/30",
  },
  {
    date: "02 Jun 2026",
    quality: "Excellent",
    confidence: 98,
    qualityColor: "bg-primary/15 text-primary border border-primary/30",
  },
];

export function AnalysisTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Analysis Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {timelineData.map((item, index) => (
            <div key={item.date} className="group relative flex gap-3 pb-6 last:pb-0">
              {/* Timeline line */}
              {index < timelineData.length - 1 && (
                <div className="absolute left-[7px] top-5 h-full w-px bg-border" />
              )}
              {/* Timeline dot */}
              <div className="relative z-10 mt-1.5 flex size-4 shrink-0 items-center justify-center">
                <CheckCircle2 className="size-4 text-primary" />
              </div>
              {/* Content */}
              <div className="flex-1 space-y-1.5">
                <p className="text-xs text-muted-foreground">{item.date}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="default" className={item.qualityColor}>
                    {item.quality}
                  </Badge>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {item.confidence}%
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  className="h-6 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Eye className="size-3" />
                  Quick View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
