import { Destination } from "@/types/map.type";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const statusConfig = {
  excellent: {
    label: "Sangat Baik",
    dot: "bg-emerald-500",
  },
  good: {
    label: "Baik",
    dot: "bg-sky-500",
  },
  moderate: {
    label: "Sedang",
    dot: "bg-amber-500",
  },
  poor: {
    label: "Buruk",
    dot: "bg-red-500",
  },
} as const;

export function DestinationListItem({
  destination,
  isSelected,
  onClick,
}: {
  destination: Destination;
  isSelected: boolean;
  onClick: () => void;
}) {
  const config = statusConfig[destination.status];
  const isTrending =
    destination.latestScore !== null && destination.latestScore >= 80;

  return (
    <Button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border p-3 text-left transition-all duration-150",
        "hover:border-primary/40 hover:bg-accent/60",
        isSelected
          ? "border-primary/60 bg-primary/5 shadow-sm"
          : "border-border bg-card",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn("mt-0.5 size-2.5 shrink-0 rounded-full", config.dot)}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <p className="truncate text-sm font-medium">{destination.name}</p>
            {isTrending && (
              <TrendingUp className="size-3 shrink-0 text-orange-500" />
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{destination.location}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
              {config.label}
            </Badge>
            {destination.latestScore !== null && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4"
              >
                Skor: {destination.latestScore}
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
              {destination.province}
            </Badge>
          </div>
        </div>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-muted-foreground/50 transition-transform",
            isSelected && "translate-x-0.5 text-primary",
          )}
        />
      </div>
    </Button>
  );
}
