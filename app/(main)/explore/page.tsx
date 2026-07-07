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
    <div className="min-h-screen my-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
        <div className="col-span-2 col-start-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ResultCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
