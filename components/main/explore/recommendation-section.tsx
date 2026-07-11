"use client";

import { Sparkles } from "lucide-react";
import type { BeachRecommendation } from "@/types/explore.type";
import { RecommendationCard } from "./recommendation-card";

interface RecommendationSectionProps {
  recommendations: BeachRecommendation[];
}

export function RecommendationSection({
  recommendations,
}: RecommendationSectionProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
          <Sparkles className="size-5" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Rekomendasi Pantai Terbaik (AI)
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground -mt-2">
        Daftar pantai teratas berdasarkan pemodelan kesesuaian lingkungan darat
        dan laut terkecil dari polusi antropogenik.
      </p>

      <div className="grid grid-cols-1 gap-4">
        {recommendations.slice(0, 1).map((rec) => (
          <RecommendationCard key={rec.slug} rec={rec} />
        ))}
      </div>
    </div>
  );
}
