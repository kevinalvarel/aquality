"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchAndFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchVal.trim() !== "") {
        params.set("search", searchVal);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchVal, pathname, router, searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "all-time" && value !== "newest") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari pantai..."
          className="pl-9"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={searchParams.get("status") || "all"}
          onValueChange={(val) => handleFilterChange("status", val)}
        >
          <SelectTrigger className="w-[140px]">
            <SlidersHorizontal className="mr-1.5 size-3.5 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="excellent">Sangat Baik</SelectItem>
            <SelectItem value="good">Baik</SelectItem>
            <SelectItem value="moderate">Sedang</SelectItem>
            <SelectItem value="poor">Buruk</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("date") || "all-time"}
          onValueChange={(val) => handleFilterChange("date", val)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tanggal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">Semua Waktu</SelectItem>
            <SelectItem value="today">Hari Ini</SelectItem>
            <SelectItem value="week">Minggu Ini</SelectItem>
            <SelectItem value="month">Bulan Ini</SelectItem>
            <SelectItem value="quarter">Kuartal Ini</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("sort") || "newest"}
          onValueChange={(val) => handleFilterChange("sort", val)}
        >
          <SelectTrigger className="w-[170px]">
            <SelectValue placeholder="Urutkan berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru Dahulu</SelectItem>
            <SelectItem value="oldest">Terlama Dahulu</SelectItem>
            <SelectItem value="highest">Keyakinan Tertinggi</SelectItem>
            <SelectItem value="lowest">Keyakinan Terendah</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
