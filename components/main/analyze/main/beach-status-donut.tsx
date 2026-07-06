import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PieChart } from "lucide-react";

interface DonutSegment {
  label: string;
  value: number;
  color: string;
  tokenClass: string;
}

interface BeachStatusDonutProps {
  data: { status: string; count: number }[];
}

export function BeachStatusDonut({ data }: BeachStatusDonutProps) {
  const configMap: Record<string, { color: string; tokenClass: string }> = {
    Excellent: { color: "var(--primary)", tokenClass: "text-primary" },
    Good: { color: "var(--success)", tokenClass: "text-success" },
    Moderate: { color: "var(--warning)", tokenClass: "text-warning" },
    Poor: { color: "var(--destructive)", tokenClass: "text-destructive" },
  };

  const segments: DonutSegment[] = [
    { label: "Excellent", value: data.find(d => d.status === "Excellent")?.count ?? 0, ...configMap.Excellent },
    { label: "Good", value: data.find(d => d.status === "Good")?.count ?? 0, ...configMap.Good },
    { label: "Moderate", value: data.find(d => d.status === "Moderate")?.count ?? 0, ...configMap.Moderate },
    { label: "Poor", value: data.find(d => d.status === "Poor")?.count ?? 0, ...configMap.Poor },
  ];

  const total = segments.reduce((sum, s) => sum + s.value, 0);

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PieChart className="size-4 text-primary" />
            Beach Status Distribution
          </CardTitle>
          <CardDescription>Classification breakdown across all analyses</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[240px] items-center justify-center text-muted-foreground text-sm">
          No analysis distribution data available.
        </CardContent>
      </Card>
    );
  }

  const size = 200;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativeOffset = 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PieChart className="size-4 text-primary" />
          Beach Status Distribution
        </CardTitle>
        <CardDescription>Classification breakdown across all analyses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          {/* Donut chart */}
          <div className="relative">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="rotate-[-90deg]"
            >
              {segments.map((segment) => {
                if (segment.value === 0) return null;
                const segmentLength =
                  (segment.value / total) * circumference;
                const gapSize = total > segment.value ? 4 : 0;
                const dashArray = `${Math.max(0, segmentLength - gapSize)} ${
                  circumference - segmentLength + gapSize
                }`;
                const offset = cumulativeOffset;
                cumulativeOffset += segmentLength;

                return (
                  <circle
                    key={segment.label}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={dashArray}
                    strokeDashoffset={-offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{total}</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {segments.map((segment) => (
              <Tooltip key={segment.label}>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between gap-6 cursor-default">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {segment.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tabular-nums">
                        {segment.value}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        ({Math.round((segment.value / total) * 100)}%)
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {segment.value} analyses classified as {segment.label}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
