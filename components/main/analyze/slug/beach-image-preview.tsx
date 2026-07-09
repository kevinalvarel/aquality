"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Upload,
  RefreshCw,
  ZoomIn,
  MapPin,
  Clock,
  Navigation,
  CloudSun,
} from "lucide-react";
import type { BeachApiResponse } from "@/types/beach-api.type";

interface BeachImagePreviewProps {
  data: BeachApiResponse;
}

export function BeachImagePreview({ data }: BeachImagePreviewProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pratinjau Gambar Pantai</CardTitle>
            <CardDescription>
              Gambar pesisir yang dianalisis
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="size-3.5" />
              Unggah Gambar
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="size-3.5" />
              Ganti
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Real image with fallback gradient */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-200 dark:from-sky-600 dark:via-cyan-500 dark:to-emerald-400">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.url_gambar}
              alt={data.pantai}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="gap-2 shadow-xl"
                  onClick={() => window.open(data.url_gambar, "_blank")}
                >
                  <ZoomIn className="size-5" />
                  Lihat Ukuran Penuh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buka gambar dalam resolusi penuh</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetadataItem
            icon={<MapPin className="size-3.5" />}
            label="Nama Pantai"
            value={data.pantai}
          />
          <MetadataItem
            icon={<Navigation className="size-3.5" />}
            label="Kecamatan"
            value={data.kecamatan}
          />
          <MetadataItem
            icon={<Clock className="size-3.5" />}
            label="Kabupaten / Kota"
            value={data.kabupaten_kota}
          />
          <MetadataItem
            icon={<CloudSun className="size-3.5" />}
            label="Status Kualitas"
            value={data.status_kualitas_2026}
          />
        </div>
        <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          <span className="font-medium">Koordinat GPS:</span>{" "}
          {data.latitude}° latitude, {data.longitude}° longitude
        </div>
      </CardContent>
    </Card>
  );
}

function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2.5">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

