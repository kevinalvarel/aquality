import { Suspense } from "react";
import { getExploreBeaches } from "@/services/explore.service";
import { ExplorePageClient } from "./explore-client";
import { ResultCardSkeleton } from "@/components/main/explore/result-card";

export const dynamic = "force-dynamic";

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExplorePageFallback />}>
      <ExplorePageData />
    </Suspense>
  );
}

async function ExplorePageData() {
  const beaches = await getExploreBeaches();
  return <ExplorePageClient beaches={beaches} />;
}

function ExplorePageFallback() {
  return (
    <div className="min-h-screen px-4 py-6 md:px-6 lg:px-8 space-y-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 md:col-start-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <ResultCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
