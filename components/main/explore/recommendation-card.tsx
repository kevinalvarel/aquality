import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BeachRecommendation } from "@/types/explore.type";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

function parseMarkdown(text: string) {
  if (!text) return "";
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function RecommendationCard({ rec }: { rec: BeachRecommendation }) {
  const isSangatRekomendasi = rec.label_rekomendasi
    .toUpperCase()
    .includes("SANGAT");

  return (
    <Link href={`/explore/${rec.slug}`} className="group block">
      <Card className="overflow-hidden border border-primary/15 hover:border-primary/40 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10">
        <CardContent className="p-0 flex flex-col md:flex-row">
          {/* Image Container */}
          <div className="relative aspect-video md:aspect-auto md:w-[320px] shrink-0 overflow-hidden bg-muted">
            {rec.url_gambar ? (
              <Image
                src={rec.url_gambar}
                alt={rec.pantai}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Sparkles className="size-10 text-muted-foreground/30" />
              </div>
            )}

            {/* Rank Overlay */}
            <div className="absolute top-3 left-3 flex items-center justify-center size-9 rounded-xl bg-background/95 font-extrabold text-sm text-primary shadow-md border border-primary/20 backdrop-blur-sm">
              #{rec.ranking}
            </div>

            {/* Recommendation Label Overlay */}
            <div className="absolute top-3 right-3">
              <Badge
                variant="default"
                className={cn(
                  "text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 shadow-md border-0 rounded-lg",
                  isSangatRekomendasi
                    ? "bg-success text-success-foreground hover:bg-success/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {rec.label_rekomendasi}
              </Badge>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
            <div className="space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                    {rec.pantai}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span>
                      {rec.kecamatan}, {rec.kabupaten_kota}
                    </span>
                  </div>
                </div>

                {/* Health Score display */}
                <div className="flex items-center gap-2.5 self-start sm:self-auto bg-primary/10 border border-primary/20 rounded-2xl px-4 py-2 shrink-0">
                  <TrendingUp className="size-5 text-primary" />
                  <div>
                    <p className="text-[10px] leading-none text-muted-foreground uppercase font-semibold tracking-wider">
                      Health Score
                    </p>
                    <p className="text-base font-extrabold tabular-nums text-primary mt-0.5">
                      {rec.health_score.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Narrative block */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {parseMarkdown(rec.narasi_rekomendasi)}
              </p>
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/80">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-1.5 text-primary shrink-0">
                  <Factory className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                    Skor Industri
                  </p>
                  <p className="text-xs font-semibold">
                    {rec.skor_detail.skor_industri.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-1.5 text-primary shrink-0">
                  <Home className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                    Kepadatan Penduduk
                  </p>
                  <p className="text-xs font-semibold">
                    {rec.skor_detail.skor_kepadatan_penduduk.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-1.5 text-primary shrink-0">
                  <ShieldCheck className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                    Pengaruh Urban
                  </p>
                  <p className="text-xs font-semibold">
                    {rec.skor_detail.skor_pengaruh_urban.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform self-end gap-0.5">
              <span>Lihat Detail Analisis</span>
              <ChevronRight className="size-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
