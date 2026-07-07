"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type {
  LeaderboardFilters,
  BeachStatus,
  SortField,
  SortDirection,
} from "@/types/leaderboard.type";
import { Search, X, CalendarRange } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LeaderboardFiltersProps {
  filters: LeaderboardFilters;
  locations: string[];
  onSearchChange: (search: string) => void;
  onStatusChange: (status: BeachStatus | "all") => void;
  onLocationChange: (location: string) => void;
  onSortChange: (field: SortField, direction: SortDirection) => void;
  onReset: () => void;
}

export function LeaderboardFilters({
  filters,
  locations,
  onSearchChange,
  onStatusChange,
  onLocationChange,
  onSortChange,
  onReset,
}: LeaderboardFiltersProps) {
  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.location !== "all";

  return (
    <section
      id="leaderboard-filters"
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
    >
      {/* Search */}
      <div className="relative flex-1 sm:min-w-[220px] sm:max-w-[320px]">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="leaderboard-search"
          placeholder="Cari pantai..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Status */}
      <Select
        value={filters.status}
        onValueChange={(v) => onStatusChange(v as BeachStatus | "all")}
      >
        <SelectTrigger id="status-filter" className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="Excellent">Sangat Baik</SelectItem>
          <SelectItem value="Good">Baik</SelectItem>
          <SelectItem value="Moderate">Sedang</SelectItem>
          <SelectItem value="Poor">Buruk</SelectItem>
        </SelectContent>
      </Select>

      {/* Location */}
      <Select
        value={filters.location || "all"}
        onValueChange={onLocationChange}
      >
        <SelectTrigger id="location-filter" className="w-[180px]">
          <SelectValue placeholder="Lokasi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Lokasi</SelectItem>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={`${filters.sortField}:${filters.sortDirection}`}
        onValueChange={(v) => {
          const [field, dir] = v.split(":") as [SortField, SortDirection];
          onSortChange(field, dir);
        }}
      >
        <SelectTrigger id="sort-select" className="w-[190px]">
          <SelectValue placeholder="Urutkan berdasarkan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="environmentalScore:desc">
            Skor: Tinggi → Rendah
          </SelectItem>
          <SelectItem value="environmentalScore:asc">
            Skor: Rendah → Tinggi
          </SelectItem>
          <SelectItem value="beachName:asc">Nama: A → Z</SelectItem>
          <SelectItem value="beachName:desc">Nama: Z → A</SelectItem>
          <SelectItem value="aiConfidence:desc">
            Keyakinan AI: Tinggi → Rendah
          </SelectItem>
          <SelectItem value="lastAnalyzed:desc">Baru-baru Ini Dianalisis</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Placeholder */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled
              id="date-range-picker"
              className="gap-1.5"
            >
              <CalendarRange className="size-3.5" data-icon="inline-start" />
              Rentang Tanggal
            </Button>
          </TooltipTrigger>
          <TooltipContent>Segera hadir</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Reset */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          id="reset-filters-btn"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" data-icon="inline-start" />
          Hapus Filter
        </Button>
      )}
    </section>
  );
}
