import { Star } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      <Star className="size-3 fill-amber-400 stroke-amber-500" />
      <span className="text-xs font-semibold text-foreground">{rating}</span>
    </span>
  );
}
