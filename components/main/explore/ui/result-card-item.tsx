import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ExploreBeachItem } from "@/types/explore.type";
import { cn } from "@/lib/utils";
import { parseMarkdown } from "@/lib/parse-markdown";

//Status Badge Config
const statusConfig = {
  excellent: {
    label: "Sangat Baik",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  good: {
    label: "Baik",
    className:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  },
  moderate: {
    label: "Sedang",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  poor: {
    label: "Buruk",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
} as const;

export function ResultCardItem({ beach }: { beach: ExploreBeachItem }) {
  const config = statusConfig[beach.status];
  const hasAnalysis = beach.latestScore !== null;

  return (
    <Link href={`/analyze/${beach.slug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/30">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {beach.image ? (
              <Image
                src={beach.image}
                alt={beach.pantai}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Waves className="size-8 text-muted-foreground/40" />
              </div>
            )}
            {/* Status badge overlay */}
            <div className="absolute top-2 left-2">
              <Badge
                variant="outline"
                className={cn("text-[10px] backdrop-blur-sm", config.className)}
              >
                {config.label}
              </Badge>
            </div>
            {/* Score overlay */}
            {hasAnalysis && (
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
                <TrendingUp className="size-3 text-primary" />
                <span>{beach.latestScore}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5 p-3">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-1">
            {beach.pantai}
          </CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate">{beach.kecamatan}</span>
          </div>
          {beach.description && (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {parseMarkdown(beach.description)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export function ResultCardEmpty() {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
      <div className="rounded-full bg-muted p-4">
        <Waves className="size-8 text-muted-foreground/50" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">Belum ada pantai</p>
        <p className="text-xs text-muted-foreground">
          Data pantai belum tersedia saat ini
        </p>
      </div>
    </div>
  );
}
