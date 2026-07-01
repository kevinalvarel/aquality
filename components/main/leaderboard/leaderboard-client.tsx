"use client";

import { useState, useCallback, useEffect } from "react";
import type { BeachLeaderboard, LeaderboardSummary } from "@/types/leaderboard";
import { LeaderboardHeader } from "@/components/main/leaderboard/leaderboard-header";
import { LeaderboardSummary as LeaderboardSummaryCards } from "@/components/main/leaderboard/leaderboard-summary";
import { LeaderboardPodium } from "@/components/main/leaderboard/leaderboard-podium";
import { LeaderboardFilters } from "@/components/main/leaderboard/leaderboard-filters";
import { LeaderboardTable } from "@/components/main/leaderboard/leaderboard-table";
import { LeaderboardSheet } from "@/components/main/leaderboard/leaderboard-sheet";
import { LeaderboardEmpty } from "@/components/main/leaderboard/leaderboard-empty";
import { LeaderboardChart } from "@/components/main/leaderboard/leaderboard-chart";
import {
  useLeaderboardFilters,
  useSelectedBeach,
} from "@/hooks/use-leaderboard";

interface LeaderboardClientProps {
  initialData: BeachLeaderboard[];
  initialSummary: LeaderboardSummary;
  initialTopBeaches: BeachLeaderboard[];
  initialLocations: string[];
  initialDistribution: { status: string; count: number; fill: string }[];
}

export function LeaderboardClient({
  initialData,
  initialSummary,
  initialTopBeaches,
  initialLocations,
  initialDistribution,
}: LeaderboardClientProps) {
  const {
    filters,
    page,
    setPage,
    isPending,
    setSearch,
    setStatus,
    setLocation,
    setSort,
    resetFilters,
  } = useLeaderboardFilters();

  const { selectedBeach, isSheetOpen, openSheet, closeSheet } =
    useSelectedBeach();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Client-side filtering & sorting
  const filteredData = useFilteredData(initialData, filters);
  const pageSize = 5;
  const total = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate refresh – in production this would re-fetch from API
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  if (initialData.length === 0) {
    return (
      <div className="space-y-8 py-6">
        <LeaderboardHeader
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
        <LeaderboardEmpty onRefresh={handleRefresh} />
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <LeaderboardHeader
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <LeaderboardSummaryCards summary={initialSummary} />

      <LeaderboardPodium topBeaches={initialTopBeaches} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <LeaderboardFilters
            filters={filters}
            locations={initialLocations}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onLocationChange={setLocation}
            onSortChange={setSort}
            onReset={resetFilters}
          />

          {paginatedData.length > 0 ? (
            <LeaderboardTable
              data={paginatedData}
              page={safePage}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={setPage}
              onRowClick={openSheet}
            />
          ) : (
            <LeaderboardEmpty onRefresh={resetFilters} />
          )}
        </div>

        <div className="hidden lg:block">
          <LeaderboardChart data={initialDistribution} />
        </div>
      </div>

      <LeaderboardSheet
        beach={selectedBeach}
        open={isSheetOpen}
        onOpenChange={closeSheet}
      />
    </div>
  );
}

function useFilteredData(
  data: BeachLeaderboard[],
  filters: ReturnType<typeof useLeaderboardFilters>["filters"],
): BeachLeaderboard[] {
  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    let result = [...data];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.beachName.toLowerCase().includes(query) ||
          b.location.toLowerCase().includes(query),
      );
    }

    if (filters.status !== "all") {
      result = result.filter((b) => b.status === filters.status);
    }

    if (filters.location && filters.location !== "all") {
      result = result.filter((b) => b.location === filters.location);
    }

    result.sort((a, b) => {
      const field = filters.sortField;
      const dir = filters.sortDirection === "asc" ? 1 : -1;

      if (field === "beachName") {
        return a.beachName.localeCompare(b.beachName) * dir;
      }
      if (field === "lastAnalyzed") {
        return (
          (new Date(a.lastAnalyzed).getTime() -
            new Date(b.lastAnalyzed).getTime()) *
          dir
        );
      }
      return ((a[field] as number) - (b[field] as number)) * dir;
    });

    setFiltered(result);
  }, [data, filters]);

  return filtered;
}
