import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";
import { cn } from "@/lib/utils";
import {
  Droplets,
  MapPin,
  Shield,
  Sparkles,
  Waves,
  ChevronRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { generateBeachAnalysis } from "@/lib/beach-analysis.util";
import type { Destination } from "@/types/map.type";

const statusConfig = {
  excellent: {
    label: "Sangat Baik",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  good: {
    label: "Baik",
    className:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
    dot: "bg-sky-500",
  },
  moderate: {
    label: "Sedang",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  poor: {
    label: "Buruk",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    dot: "bg-red-500",
  },
} as const;

const markerColor = {
  excellent: "bg-emerald-500",
  good: "bg-sky-500",
  moderate: "bg-amber-500",
  poor: "bg-red-500",
} as const;

// ─── DestinationMarker ──────────────────────────────────────────────────────

export function DestinationMarker({
  destination,
  isSelected,
  onClick,
}: {
  destination: Destination;
  isSelected: boolean;
  onClick: () => void;
}) {
  const analysis = useMemo(
    () =>
      generateBeachAnalysis({
        pantai: destination.pantai,
        kecamatan: destination.kecamatan,
        status: destination.status,
        latestScore: destination.latestScore,
        latestConfidence: destination.latestConfidence,
      }),
    [destination],
  );

  const config = statusConfig[destination.status];
  const color = markerColor[destination.status];

  return (
    <MapMarker
      longitude={destination.longitude}
      latitude={destination.latitude}
    >
      <MarkerContent>
        <button
          type="button"
          onClick={onClick}
          className="group relative flex flex-col items-center"
          aria-label={`Lihat ${destination.pantai}`}
        >
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full border-2 border-white px-2.5 py-1 shadow-lg transition-all duration-200",
              color,
              isSelected
                ? "scale-110 ring-2 ring-white ring-offset-1 ring-offset-transparent"
                : "group-hover:scale-105",
            )}
          >
            <Waves className="size-3 text-white" />
            <span className="max-w-[120px] truncate text-[11px] font-semibold text-white">
              {destination.pantai}
            </span>
          </div>
          {/* Tail */}
          <div
            className={cn(
              "w-0.5 transition-all duration-200",
              color,
              isSelected ? "h-2.5" : "h-1.5",
            )}
          />
        </button>
      </MarkerContent>

      {isSelected && (
        <MarkerPopup closeButton offset={20} anchor="top">
          <div className="max-w-full space-y-3 sm:w-80">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-tight">
                  {destination.pantai}
                </h3>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3 shrink-0" />
                  <span className="truncate">{destination.kecamatan}</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn("shrink-0 text-[10px]", config.className)}
              >
                {config.label}
              </Badge>
            </div>

            {/* Score Indicator */}
            {analysis.score !== null && (
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
                <div className="relative flex size-10 items-center justify-center">
                  <svg
                    className="size-10 -rotate-90"
                    viewBox="0 0 36 36"
                    aria-hidden="true"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      className="stroke-muted"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      className={cn(
                        "transition-all duration-500",
                        analysis.score >= 70
                          ? "stroke-emerald-500"
                          : analysis.score >= 40
                            ? "stroke-amber-500"
                            : "stroke-red-500",
                      )}
                      strokeWidth="3"
                      strokeDasharray={`${(analysis.score / 100) * 94.2} 94.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold">
                    {analysis.score}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">Skor Lingkungan</p>
                  <p className="text-[10px] text-muted-foreground">
                    Kualitas: {analysis.waterQuality}
                  </p>
                </div>
              </div>
            )}

            {/* Analysis Grid */}
            <div className="grid grid-cols-3 gap-2">
              <AnalysisBadge
                icon={<Droplets className="size-3" />}
                label="Air"
                value={analysis.waterQuality}
              />
              <AnalysisBadge
                icon={<Shield className="size-3" />}
                label="Keamanan"
                value={analysis.safetyStatus}
              />
              <AnalysisBadge
                icon={<Sparkles className="size-3" />}
                label="Kebersihan"
                value={analysis.cleanliness}
              />
            </div>

            {/* Activities */}
            <div className="flex flex-wrap gap-1">
              {analysis.activities.map((activity) => (
                <Badge
                  key={activity}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0"
                >
                  {activity}
                </Badge>
              ))}
            </div>

            {/* Summary */}
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
              {analysis.recommendation}
            </p>

            {/* CTA Button */}
            <Button asChild size="sm" className="w-full gap-1.5 text-xs">
              <Link href={`/analyze/${destination.slug}`}>
                <Activity className="size-3" />
                Lihat Analisis Lengkap
                <ChevronRight className="size-3" />
              </Link>
            </Button>
          </div>
        </MarkerPopup>
      )}
    </MapMarker>
  );
}

// ─── Helper Components ──────────────────────────────────────────────────────

function AnalysisBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-md bg-muted/40 px-2 py-1.5 text-center">
      <div className="text-muted-foreground">{icon}</div>
      <span className="text-[9px] text-muted-foreground">{label}</span>
      <span className="text-[10px] font-medium leading-tight">{value}</span>
    </div>
  );
}

// ─── Loading Skeleton ───────────────────────────────────────────────────────

export function DestinationMarkerPopupSkeleton() {
  return (
    <div className="w-72 space-y-3 sm:w-80">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-14 w-full rounded-lg" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 rounded-md" />
        <Skeleton className="h-14 rounded-md" />
        <Skeleton className="h-14 rounded-md" />
      </div>
      <div className="flex gap-1">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-4 w-14 rounded-full" />
      </div>
      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  );
}
