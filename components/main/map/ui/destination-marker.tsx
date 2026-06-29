import { Badge } from "@/components/ui/badge";
import { MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";
import { cn } from "@/lib/utils";
import { Clock, Navigation, Waves } from "lucide-react";
import { StarRating } from "./star-rating";
import { Destination } from "@/types/map.type";

export function DestinationMarker({
  destination,
  isSelected,
  onClick,
}: {
  destination: Destination;
  isSelected: boolean;
  onClick: () => void;
}) {
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
          aria-label={`Lihat ${destination.name}`}
        >
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full border-2 border-white bg-sky-500 px-2.5 py-1 shadow-lg transition-all duration-200",
              isSelected
                ? "scale-110 ring-2 ring-white ring-offset-1 ring-offset-transparent"
                : "group-hover:scale-105",
            )}
          >
            <Waves className="size-3 text-white" />
            <span className="max-w-[120px] truncate text-[11px] font-semibold text-white">
              {destination.name}
            </span>
          </div>
          {/* Tail */}
          <div
            className={cn(
              "w-0.5 bg-sky-500 transition-all duration-200",
              isSelected ? "h-2.5" : "h-1.5",
            )}
          />
        </button>
      </MarkerContent>

      {isSelected && (
        <MarkerPopup closeButton offset={20} anchor="top">
          <div className="w-56 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold leading-tight">
                {destination.name}
              </h3>
              <Badge
                variant="outline"
                className="shrink-0 text-[10px] bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800"
              >
                Pantai
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <StarRating rating={destination.rating} />
              <span>({destination.reviewCount.toLocaleString()})</span>
              <span className="flex items-center gap-1">
                <Navigation className="size-3" />
                {destination.distance}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
              {destination.description}
            </p>
            <div className="flex items-center gap-1 flex-wrap">
              {destination.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground border-t pt-2">
              <Clock className="size-3" />
              <span>Estimasi kunjungan: {destination.visitDuration}</span>
            </div>
          </div>
        </MarkerPopup>
      )}
    </MapMarker>
  );
}
