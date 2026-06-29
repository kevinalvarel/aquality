import { Destination } from "@/types/map.type";
import { StarRating } from "./star-rating";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function DestinationListItem({
  destination,
  isSelected,
  onClick,
}: {
  destination: Destination;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
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
        <div className="mt-0.5 size-2.5 shrink-0 rounded-full bg-sky-500" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <p className="truncate text-sm font-medium">{destination.name}</p>
            {destination.trending && (
              <TrendingUp className="size-3 shrink-0 text-orange-500" />
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <StarRating rating={destination.rating} />
            <span>·</span>
            <span className="truncate">{destination.distance}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {destination.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-muted-foreground/50 transition-transform",
            isSelected && "translate-x-0.5 text-primary",
          )}
        />
      </div>
    </button>
  );
}
