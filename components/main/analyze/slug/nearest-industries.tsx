import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, MapPin } from "lucide-react";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";

interface NearestIndustriesProps {
  data: AnalyzeApiResponse;
}

export function NearestIndustries({ data }: NearestIndustriesProps) {
  const industries = [
    {
      name: data.industri_terdekat,
      type: data.tipe_industri,
      distance: data.jarak_industri_km,
      rank: 1,
    },
    {
      name: data.industri_terdekat_2,
      type: data.tipe_industri_2,
      distance: data.jarak_industri_2_km,
      rank: 2,
    },
    {
      name: data.industri_terdekat_3,
      type: data.tipe_industri_3,
      distance: data.jarak_industri_3_km,
      rank: 3,
    },
  ].filter((ind) => ind.name);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Factory className="size-4 text-primary" />
          Industri Terdekat
        </CardTitle>
        <CardDescription className="text-xs">
          Daftar industri terdekat dan jarak ke area pesisir
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {industries.length === 0 ? (
          <p className="text-xs text-muted-foreground">Tidak ada data industri terdekat.</p>
        ) : (
          <div className="space-y-3">
            {industries.map((ind) => (
              <div
                key={ind.rank}
                className="flex items-start justify-between rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
              >
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-foreground">{ind.name}</p>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 font-normal">
                      {ind.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-muted-foreground">
                  <MapPin className="size-3 text-primary" />
                  <span className="text-xs font-medium tabular-nums text-foreground">
                    {ind.distance.toFixed(2)} km
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
