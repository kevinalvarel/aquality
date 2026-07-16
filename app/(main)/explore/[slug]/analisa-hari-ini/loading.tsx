import { Skeleton } from "@/components/ui/skeleton";

export default function AnalisisHariIniLoading() {
  return (
    <div className="space-y-6 px-4 py-6 md:px-6 lg:px-8">
      {/* Hero skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-80 mb-3" />
          <Skeleton className="h-5 w-60 mb-4" />
          <Skeleton className="h-7 w-44 rounded-full" />
        </div>
      </div>

      {/* Summary skeleton */}
      <div className="rounded-xl border border-border/50 p-6">
        <Skeleton className="h-5 w-40 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 p-4">
            <Skeleton className="size-10 rounded-lg mb-3" />
            <Skeleton className="h-7 w-20 mb-1" />
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="rounded-xl border border-border/50 p-6">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* Two columns skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border/50 p-6">
          <Skeleton className="h-5 w-52 mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <Skeleton className="size-8 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border/50 p-6">
          <Skeleton className="h-5 w-40 mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mb-4">
              <Skeleton className="h-4 w-36 mb-2" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sections skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border/50 p-6">
          <Skeleton className="h-5 w-48 mb-3" />
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="rounded-xl border border-border/50 p-6">
          <Skeleton className="h-5 w-36 mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
