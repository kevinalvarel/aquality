import { Suspense } from "react";
import { getBeachesForMap } from "@/services/explore.service";
import { MapPageClient } from "./map-client";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";

export default function MapPage() {
  return (
    <Suspense fallback={<MapPageFallback />}>
      <MapPageData />
    </Suspense>
  );
}

async function MapPageData() {
  const beaches = await getBeachesForMap();
  return <MapPageClient beaches={beaches} />;
}

function MapPageFallback() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full pb-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[520px]">
        <aside className="flex w-72 shrink-0 flex-col gap-3 lg:w-80">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-4 w-48" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </aside>
        <Skeleton className="flex-1 rounded-xl" />
      </div>
    </div>
  );
}
