import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { MonthlyStatItem } from "@/types/dashboard.type";

interface AnalysisTrendChartProps {
  data: MonthlyStatItem[];
}

export function AnalysisTrendChart({ data }: AnalysisTrendChartProps) {
  const lineData = data.map((d) => ({
    month: d.month,
    value: d.totalAnalyses,
  }));

  if (lineData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="size-4 text-primary" />
            Analysis Trend
          </CardTitle>
          <CardDescription>Number of analyses over time</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center text-muted-foreground text-sm">
          No trend data available.
        </CardContent>
      </Card>
    );
  }

  const maxValue = Math.max(...lineData.map((d) => d.value), 1);

  // Generate SVG path for line chart
  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = lineData.map((d, i) => ({
    x: padding.left + (lineData.length > 1 ? (i / (lineData.length - 1)) * chartWidth : chartWidth / 2),
    y: padding.top + chartHeight - (d.value / maxValue) * chartHeight,
    ...d,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padding.top + chartHeight
  } L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Calculate percentage change if we have at least two months
  let percentageLabel = "Stable";
  let isPositive = true;
  if (lineData.length >= 2) {
    const prev = lineData[lineData.length - 2].value;
    const current = lineData[lineData.length - 1].value;
    if (prev > 0) {
      const diff = ((current - prev) / prev) * 100;
      isPositive = diff >= 0;
      percentageLabel = `${diff >= 0 ? "+" : ""}${Math.round(diff)}% this month`;
    } else if (current > 0) {
      percentageLabel = `+100% this month`;
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4 text-primary" />
              Analysis Trend
            </CardTitle>
            <CardDescription>Number of analyses over time</CardDescription>
          </div>
          <span className={`rounded-md px-2 py-1 text-xs font-medium ${
            isPositive ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
          }`}>
            {percentageLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient
              id="areaGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                className="text-primary"
                style={{ stopColor: "currentColor", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                className="text-primary"
                style={{ stopColor: "currentColor", stopOpacity: 0.02 }}
              />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1={padding.left}
              x2={width - padding.right}
              y1={padding.top + chartHeight * (1 - ratio)}
              y2={padding.top + chartHeight * (1 - ratio)}
              className="stroke-border"
              strokeWidth={0.5}
              strokeDasharray="4 4"
            />
          ))}

          {/* Area */}
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            className="stroke-primary"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((p) => (
            <g key={p.month}>
              <circle
                cx={p.x}
                cy={p.y}
                r={3.5}
                className="fill-primary stroke-card"
                strokeWidth={2}
              />
            </g>
          ))}

          {/* X-axis labels */}
          {points.map((p) => (
            <text
              key={`label-${p.month}`}
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {p.month}
            </text>
          ))}
        </svg>
      </CardContent>
    </Card>
  );
}
