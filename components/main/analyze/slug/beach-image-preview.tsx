"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Upload,
  RefreshCw,
  ZoomIn,
  MapPin,
  Clock,
  Navigation,
  CloudSun,
  ImageIcon,
} from "lucide-react";

export function BeachImagePreview() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Beach Image Preview</CardTitle>
            <CardDescription>
              Upload a coastal image for AI analysis
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="size-3.5" />
              Upload Image
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="size-3.5" />
              Replace
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Placeholder gradient simulating a beach image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-200 dark:from-sky-600 dark:via-cyan-500 dark:to-emerald-400">
            {/* Simulated beach scene with CSS */}
            <div className="absolute inset-0">
              {/* Sky */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky-300 to-sky-200 dark:from-sky-700 dark:to-sky-500" />
              {/* Ocean */}
              <div className="absolute inset-x-0 top-[35%] h-[30%] bg-gradient-to-b from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-700">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(255,255,255,0.1)_40px,rgba(255,255,255,0.1)_80px)]" />
              </div>
              {/* Sand */}
              <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-b from-amber-200 to-amber-300 dark:from-amber-400 dark:to-amber-500" />
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
                  <ImageIcon className="size-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="gap-2 shadow-xl"
                >
                  <ZoomIn className="size-5" />
                  View Full Size
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open image in full resolution</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetadataItem
            icon={<MapPin className="size-3.5" />}
            label="Beach Name"
            value="Kuta Beach"
          />
          <MetadataItem
            icon={<Navigation className="size-3.5" />}
            label="Location"
            value="Bali, Indonesia"
          />
          <MetadataItem
            icon={<Clock className="size-3.5" />}
            label="Capture Time"
            value="30 Jun 2026, 14:30"
          />
          <MetadataItem
            icon={<CloudSun className="size-3.5" />}
            label="Weather"
            value="Partly Cloudy"
          />
        </div>
        <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          <span className="font-medium">GPS Coordinates:</span>{" "}
          -8.7185° S, 115.1686° E
        </div>
      </CardContent>
    </Card>
  );
}

function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2.5">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
