'use client';

import MapLibreGL from 'maplibre-gl';
import { useEffect, useState, useId } from 'react';
import { MapMarker, MarkerContent, useMap } from '@/components/ui/map';
import { Badge } from '@/components/ui/badge';
import { Factory, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Industry {
  id: string | number;
  name: string;
  latitude: number;
  longitude: number;
  type?: string;
  category?: string;
  /** Numeric weight for heatmap intensity (1–10). Defaults to 5. */
  weight?: number;
}

interface ApiIndustry {
  id?: string | number;
  name?: string;
  nama?: string;
  latitude?: number;
  lat?: number;
  longitude?: number;
  lng?: number;
  lon?: number;
  type?: string;
  jenis?: string;
  category?: string;
  kategori?: string;
  weight?: number;
  bobot?: number;
}

// ─── Heatmap Layer ───────────────────────────────────────────────────────────

const HEATMAP_SOURCE = 'industry-heatmap-source';
const HEATMAP_LAYER = 'industry-heatmap-layer';

function IndustryHeatmapLayer({
  industries,
  visible,
}: {
  industries: Industry[];
  visible: boolean;
}) {
  const { map, isLoaded } = useMap();
  const id = useId();
  const sourceId = `${HEATMAP_SOURCE}-${id}`;
  const layerId = `${HEATMAP_LAYER}-${id}`;

  useEffect(() => {
    if (!isLoaded || !map) return;

    const geojson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
      type: 'FeatureCollection',
      features: industries.map((ind) => ({
        type: 'Feature',
        properties: { weight: ind.weight ?? 5 },
        geometry: {
          type: 'Point',
          coordinates: [ind.longitude, ind.latitude],
        },
      })),
    };

    // Add source
    map.addSource(sourceId, {
      type: 'geojson',
      data: geojson,
    });

    // Add heatmap layer
    map.addLayer(
      {
        id: layerId,
        type: 'heatmap',
        source: sourceId,
        maxzoom: 15,
        paint: {
          // Increase weight as weight property increases
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'weight'],
            0,
            0,
            10,
            1,
          ],
          // Increase intensity as zoom level increases
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            0.6,
            15,
            2,
          ],
          // Color ramp: transparent → amber → orange → red
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(251,146,60,0)',
            0.1,
            'rgba(251,146,60,0.2)',
            0.3,
            'rgba(249,115,22,0.5)',
            0.5,
            'rgba(234,88,12,0.65)',
            0.7,
            'rgba(220,38,38,0.8)',
            1,
            'rgba(153,27,27,0.9)',
          ],
          // Increase radius as zoom increases
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            18,
            10,
            40,
            15,
            60,
          ],
          // Transition to transparent at higher zooms
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            0.85,
            15,
            0.3,
          ],
        },
      },
      // Insert below beach markers
      undefined,
    );

    return () => {
      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
        // ignore: map may be mid-reload
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, map]);

  // Update data when industries change
  useEffect(() => {
    if (!isLoaded || !map) return;
    const source = map.getSource(sourceId) as
      | MapLibreGL.GeoJSONSource
      | undefined;
    if (!source) return;

    source.setData({
      type: 'FeatureCollection',
      features: industries.map((ind) => ({
        type: 'Feature',
        properties: { weight: ind.weight ?? 5 },
        geometry: {
          type: 'Point',
          coordinates: [ind.longitude, ind.latitude],
        },
      })),
    });
  }, [isLoaded, map, industries, sourceId]);

  // Toggle visibility
  useEffect(() => {
    if (!isLoaded || !map || !map.getLayer(layerId)) return;
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
  }, [isLoaded, map, layerId, visible]);

  return null;
}

// ─── Industry Marker ─────────────────────────────────────────────────────────

const industryTypeColor: Record<string, string> = {
  pabrik: 'bg-orange-500',
  pertambangan: 'bg-stone-500',
  kimia: 'bg-yellow-600',
  tekstil: 'bg-purple-500',
  makanan: 'bg-green-600',
  default: 'bg-orange-500',
};

function getTypeColor(type?: string): string {
  if (!type) return industryTypeColor.default;
  const key = type.toLowerCase();
  for (const [k, v] of Object.entries(industryTypeColor)) {
    if (key.includes(k)) return v;
  }
  return industryTypeColor.default;
}

function IndustryMarker({
  industry,
  visible,
}: {
  industry: Industry;
  visible: boolean;
}) {
  if (!visible) return null;
  const color = getTypeColor(industry.type ?? industry.category);

  return (
    <MapMarker longitude={industry.longitude} latitude={industry.latitude}>
      <MarkerContent>
        <div className='group relative flex flex-col items-center'>
          <div
            title={industry.name}
            className={cn(
              'flex items-center gap-1.5 rounded-full border-2 border-white px-2 py-1 shadow-lg transition-all duration-200 cursor-pointer',
              color,
              'group-hover:scale-105',
            )}
          >
            <Factory className='size-3 text-white shrink-0' />
            <span className='max-w-[100px] truncate text-[10px] font-semibold text-white'>
              {industry.name}
            </span>
          </div>
          {/* Tail */}
          <div
            className={cn('w-0.5 h-1.5 transition-all duration-200', color)}
          />
        </div>
      </MarkerContent>
    </MapMarker>
  );
}

// ─── Main IndustryLayer ───────────────────────────────────────────────────────

interface IndustryLayerProps {
  showMarkers: boolean;
  showHeatmap: boolean;
}

function normalizeIndustry(raw: ApiIndustry, idx: number): Industry | null {
  const lat = raw.latitude ?? raw.lat;
  const lng = raw.longitude ?? raw.lng ?? raw.lon;
  if (typeof lat !== 'number' || typeof lng !== 'number') return null;

  return {
    id: raw.id ?? idx,
    name: raw.name ?? raw.nama ?? `Industri ${idx + 1}`,
    latitude: lat,
    longitude: lng,
    type: raw.type ?? raw.jenis,
    category: raw.category ?? raw.kategori,
    weight: raw.weight ?? raw.bobot ?? 5,
  };
}

export function IndustryLayer({
  showMarkers,
  showHeatmap,
}: IndustryLayerProps) {
  const [industries, setIndustries] = useState<Industry[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_AQUALITY_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/api/industries`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(
        (
          data:
            | ApiIndustry[]
            | { industries?: ApiIndustry[]; data?: ApiIndustry[] },
        ) => {
          const raw: ApiIndustry[] = Array.isArray(data)
            ? data
            : (data.industries ?? data.data ?? []);
          const normalized = raw
            .map((item, i) => normalizeIndustry(item, i))
            .filter((x): x is Industry => x !== null);
          setIndustries(normalized);
        },
      )
      .catch((err) => {
        console.warn('[IndustryLayer] Failed to load industries:', err);
      });
  }, []);

  return (
    <>
      {/* Heatmap is always mounted so visibility toggle works instantly */}
      <IndustryHeatmapLayer industries={industries} visible={showHeatmap} />
      {showMarkers &&
        industries.map((ind) => (
          <IndustryMarker key={ind.id} industry={ind} visible={showMarkers} />
        ))}
    </>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

interface IndustryLegendProps {
  showMarkers: boolean;
  showHeatmap: boolean;
  onToggleMarkers: () => void;
  onToggleHeatmap: () => void;
}

export function IndustryLegend({
  showMarkers,
  showHeatmap,
  onToggleMarkers,
  onToggleHeatmap,
}: IndustryLegendProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      {/* Markers toggle */}
      <button
        type='button'
        onClick={onToggleMarkers}
        className={cn(
          'flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] shadow-sm transition-all duration-200 backdrop-blur-sm',
          showMarkers
            ? 'bg-orange-500/90 border-orange-400 text-white'
            : 'bg-background/80 border-border/60 text-muted-foreground hover:bg-muted/80',
        )}
      >
        <Factory className='size-3 shrink-0' />
        <span className='font-medium'>Industri</span>
        {showMarkers && (
          <Badge className='h-3.5 px-1 text-[9px] bg-white/20 text-white border-transparent ml-0.5'>
            ON
          </Badge>
        )}
      </button>

      {/* Heatmap toggle */}
      <button
        type='button'
        onClick={onToggleHeatmap}
        className={cn(
          'flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] shadow-sm transition-all duration-200 backdrop-blur-sm',
          showHeatmap
            ? 'bg-red-500/90 border-red-400 text-white'
            : 'bg-background/80 border-border/60 text-muted-foreground hover:bg-muted/80',
        )}
      >
        <Flame className='size-3 shrink-0' />
        <span className='font-medium'>Heatmap</span>
        {showHeatmap && (
          <Badge className='h-3.5 px-1 text-[9px] bg-white/20 text-white border-transparent ml-0.5'>
            ON
          </Badge>
        )}
      </button>
    </div>
  );
}

export type { IndustryLayerProps };
