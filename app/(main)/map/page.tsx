"use client";

import { useState, useCallback } from "react";
import { Map, MapControls } from "@/components/ui/map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DestinationMarker } from "@/components/main/map/ui/destination-marker";
import { DestinationListItem } from "@/components/main/map/ui/destination-list-item";
import { Search, Waves, X } from "lucide-react";
import { destinations } from "@/json/destination.json";

export default function MapPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = destinations.filter((d) => {
    if (searchQuery.trim() === "") return true;
    return (
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleSelectDestination = useCallback((id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full pb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-3xl tracking-tight">Peta Interaktif</h1>
          <Badge className="bg-sky-500 text-white border-transparent text-xs">
            Pantai Banten
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Jelajahi rekomendasi pantai terbaik di Provinsi Banten
        </p>
      </div>

      <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[520px]">
        <aside className="flex w-72 shrink-0 flex-col gap-3 lg:w-80 min-h-0 overflow-hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="map-search"
              placeholder="Cari nama pantai atau aktivitas..."
              className="pl-9 pr-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Hapus pencarian"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Menampilkan{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              dari {destinations.length} pantai
            </span>
            {selectedId && (
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <X className="size-3" /> Batal pilih
              </button>
            )}
          </div>

          <ScrollArea className="flex-1 -mx-1 px-1 overflow-y-auto">
            <div className="flex flex-col gap-2 pb-2">
              {filtered.length > 0 ? (
                filtered.map((dest) => (
                  <DestinationListItem
                    key={dest.id}
                    destination={dest}
                    isSelected={selectedId === dest.id}
                    onClick={() => handleSelectDestination(dest.id)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                  <Waves className="size-8 opacity-30" />
                  <p className="text-sm">Pantai tidak ditemukan</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                  >
                    Reset pencarian
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* ── Map ── */}
        <div className="relative flex-1 overflow-hidden rounded-xl border border-border shadow-sm">
          <Map
            center={[106.0, -6.4]}
            zoom={9}
            pitch={25}
            className="h-full w-full"
          >
            <MapControls
              position="bottom-right"
              showZoom
              showCompass
              showLocate
              showFullscreen
            />

            {filtered.map((dest) => (
              <DestinationMarker
                key={dest.id}
                destination={dest}
                isSelected={selectedId === dest.id}
                onClick={() => handleSelectDestination(dest.id)}
              />
            ))}
          </Map>

          {/* Info overlay */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 text-[11px] shadow-sm backdrop-blur-sm">
            <div className="size-2 rounded-full bg-sky-500" />
            <span className="text-muted-foreground">
              Pantai · Provinsi Banten
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
