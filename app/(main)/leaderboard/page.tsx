import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getLeaderboardSummary,
  getTopBeaches,
  getAllBeaches,
  getUniqueLocations,
  getScoreDistribution,
} from "@/services/leaderboard.service";
import { LeaderboardClient } from "@/components/main/leaderboard/leaderboard-client";
import { LeaderboardLoading } from "@/components/main/leaderboard/leaderboard-loading";

export const metadata: Metadata = {
  title: "Peringkat Pantai | AQuality",
  description:
    "Bandingkan peringkat kualitas air pantai yang dihasilkan oleh analisis AI. Lihat skor lingkungan, tingkat polusi, dan kejelasan air untuk pantai.",
};

export const dynamic = "force-dynamic";

async function LeaderboardContent() {
  const [allBeaches, summary, topBeaches, locations, distribution] =
    await Promise.all([
      getAllBeaches(),
      getLeaderboardSummary(),
      getTopBeaches(3),
      getUniqueLocations(),
      getScoreDistribution(),
    ]);

  return (
    <LeaderboardClient
      initialData={allBeaches}
      initialSummary={summary}
      initialTopBeaches={topBeaches}
      initialLocations={locations}
      initialDistribution={distribution}
    />
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<LeaderboardLoading />}>
      <LeaderboardContent />
    </Suspense>
  );
}
