"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TimelineDataPoint } from "@/types/weather.type";
import { BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface WeatherTimelineChartProps {
  data: TimelineDataPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const entry = payload[0];
  const weatherDesc =
    entry && "payload" in entry
      ? (entry as unknown as { payload: TimelineDataPoint }).payload.weatherDesc
      : "";

  return (
    <div className="rounded-xl border border-border/50 bg-popover/95 p-3 shadow-xl backdrop-blur-sm">
      <p className="mb-2 text-xs font-semibold text-foreground">
        {label} WIB • {weatherDesc}
      </p>
      <div className="space-y-1">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center gap-2 text-xs">
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}:</span>
            <span className="font-medium text-foreground">
              {item.value}
              {item.dataKey === "suhu"
                ? "°C"
                : item.dataKey === "kelembapan"
                  ? "%"
                  : " mm"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherTimelineChart({ data }: WeatherTimelineChartProps) {
  if (data.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex h-64 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Data timeline cuaca tidak tersedia
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/15">
            <BarChart3 className="size-4 text-violet-400" />
          </div>
          Timeline Cuaca Hari Ini
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="suhuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="kelembapanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hujanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="circle"
                iconSize={8}
              />
              <Area
                type="monotone"
                dataKey="suhu"
                name="Suhu (°C)"
                stroke="#f97316"
                fill="url(#suhuGrad)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="kelembapan"
                name="Kelembapan (%)"
                stroke="#06b6d4"
                fill="url(#kelembapanGrad)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="curahHujan"
                name="Curah Hujan (mm)"
                stroke="#3b82f6"
                fill="url(#hujanGrad)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
