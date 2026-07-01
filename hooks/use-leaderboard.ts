"use client";

import { useState, useCallback, useTransition } from "react";
import type {
  BeachLeaderboard,
  LeaderboardFilters,
  SortField,
  SortDirection,
  BeachStatus,
} from "@/types/leaderboard";

const DEFAULT_FILTERS: LeaderboardFilters = {
  search: "",
  status: "all",
  location: "all",
  sortField: "environmentalScore",
  sortDirection: "desc",
};

export function useLeaderboardFilters() {
  const [filters, setFilters] = useState<LeaderboardFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const updateFilter = useCallback(
    <K extends keyof LeaderboardFilters>(
      key: K,
      value: LeaderboardFilters[K]
    ) => {
      startTransition(() => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
      });
    },
    []
  );

  const setSearch = useCallback(
    (search: string) => updateFilter("search", search),
    [updateFilter]
  );

  const setStatus = useCallback(
    (status: BeachStatus | "all") => updateFilter("status", status),
    [updateFilter]
  );

  const setLocation = useCallback(
    (location: string) => updateFilter("location", location),
    [updateFilter]
  );

  const setSort = useCallback(
    (field: SortField, direction: SortDirection) => {
      startTransition(() => {
        setFilters((prev) => ({
          ...prev,
          sortField: field,
          sortDirection: direction,
        }));
      });
    },
    []
  );

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setFilters(DEFAULT_FILTERS);
      setPage(1);
    });
  }, []);

  return {
    filters,
    page,
    setPage,
    isPending,
    setSearch,
    setStatus,
    setLocation,
    setSort,
    resetFilters,
  };
}

export function useSelectedBeach() {
  const [selectedBeach, setSelectedBeach] = useState<BeachLeaderboard | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = useCallback((beach: BeachLeaderboard) => {
    setSelectedBeach(beach);
    setIsSheetOpen(true);
  }, []);

  const closeSheet = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  return { selectedBeach, isSheetOpen, openSheet, closeSheet };
}
