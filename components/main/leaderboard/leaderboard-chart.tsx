"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreDistributionProps {
  data: { status: string; count: number; fill: string }[];
}

const COLORS: Record<string, string> = {
  Excellent: "#10b981",
  Good: "#87a7f5",
  Moderate: "#f59e0b",
  Poor: "#ef4444",
};

export function LeaderboardChart({ data }: ScoreDistributionProps) {
  if (data.every((d) => d.count === 0)) return null;

  return (
    <section id="score-distribution">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="status"
                  tick={{ fontSize: 12 }}
                  stroke="var(--color-muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  stroke="var(--color-muted-foreground)"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    boxShadow: "var(--shadow-md)",
                  }}
                  formatter={(value) => [`${value} beaches`, "Count"]}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={48}>
                  {data.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={COLORS[entry.status] || "#999"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {data.map((entry) => (
              <div key={entry.status} className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{
                    backgroundColor: COLORS[entry.status] || "#999",
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {entry.status} ({entry.count})
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
