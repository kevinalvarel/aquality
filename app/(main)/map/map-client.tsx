'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type MapLibreGL from 'maplibre-gl';
import { Map, MapControls } from '@/components/ui/map';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DestinationMarker } from '@/components/main/map/ui/destination-marker';
import { DestinationListItem } from '@/components/main/map/ui/destination-list-item';
import {
  Search,
  Waves,
  X,
  MapPin,
  Droplets,
  Shield,
  Sparkles,
  ChevronRight,
  Activity,
  ListFilter,
} from 'lucide-react';
import Link from 'next/link';
import { generateBeachAnalysis } from '@/lib/beach-analysis.util';
import type { MapBeachItem } from '@/types/explore.type';
import type { Destination } from '@/types/map.type';
import { cn } from '@/lib/utils';
import {
  IndustryLayer,
  IndustryLegend,
} from '@/components/main/map/ui/industry-layer';

const statusConfig = {
  excellent: {
    label: 'Sangat Baik',
    className:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    dot: 'bg-emerald-500',
  },
  good: {
    label: 'Baik',
    className:
      'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800',
    dot: 'bg-sky-500',
  },
  moderate: {
    label: 'Sedang',
    className:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    dot: 'bg-amber-500',
  },
  poor: {
    label: 'Buruk',
    className:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
    dot: 'bg-red-500',
  },
} as const;

interface MapPageClientProps {
  beaches: MapBeachItem[];
}

/** Map MapBeachItem to Destination for the map components */
function toDestination(beach: MapBeachItem): Destination {
  return {
    id: beach.id,
    slug: beach.slug,
    pantai: beach.pantai,
    kecamatan: beach.kecamatan,
    kabupatenKota: beach.kabupatenKota,
    pctSehat2026: beach.pctSehat2026,
    statusKualitas2026: beach.statusKualitas2026,
    industriTerdekat: beach.industriTerdekat,
    jarakIndustriKm: beach.jarakIndustriKm,
    kategoriDampakIndustri: beach.kategoriDampakIndustri,
    description: beach.description,
    longitude: beach.longitude,
    latitude: beach.latitude,
    image: beach.image,
    status: beach.status,
    latestScore: beach.latestScore,
    latestConfidence: beach.latestConfidence,
    lastAnalyzed: beach.lastAnalyzed,
  };
}

export function MapPageClient({ beaches }: MapPageClientProps) {
  const mapRef = useRef<MapLibreGL.Map | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showIndustryMarkers, setShowIndustryMarkers] = useState(false);
  const [showIndustryHeatmap, setShowIndustryHeatmap] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const destinations = beaches.map(toDestination);

  const filtered = destinations.filter((d) => {
    if (searchQuery.trim() === '') return true;
    const query = searchQuery.toLowerCase();
    return (
      d.pantai.toLowerCase().includes(query) ||
      d.kecamatan.toLowerCase().includes(query) ||
      d.kabupatenKota.toLowerCase().includes(query)
    );
  });

  const flyToDestination = useCallback(
    (longitude: number, latitude: number) => {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 12.5,
          essential: true,
        });
      }
    },
    [],
  );

  const handleSelectDestination = useCallback(
    (id: string) => {
      setSelectedId((prev) => {
        const next = prev === id ? null : id;
        if (next) {
          const dest = destinations.find((d) => d.id === next);
          if (dest) {
            flyToDestination(dest.longitude, dest.latitude);
          }
        }
        return next;
      });
    },
    [destinations, flyToDestination],
  );

  const handleSelectFromList = useCallback(
    (id: string) => {
      setSelectedId(id);
      setIsSheetOpen(false);
      const dest = destinations.find((d) => d.id === id);
      if (dest) {
        flyToDestination(dest.longitude, dest.latitude);
      }
    },
    [destinations, flyToDestination],
  );

  const selectedBeach = useMemo(() => {
    if (!selectedId) return null;
    return destinations.find((d) => d.id === selectedId) || null;
  }, [selectedId, destinations]);

  const selectedAnalysis = useMemo(() => {
    if (!selectedBeach) return null;
    return generateBeachAnalysis({
      pantai: selectedBeach.pantai,
      kecamatan: selectedBeach.kecamatan,
      status: selectedBeach.status,
      latestScore: selectedBeach.latestScore,
      latestConfidence: selectedBeach.latestConfidence,
    });
  }, [selectedBeach]);

  if (destinations.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-24 text-center'>
        <div className='rounded-full bg-muted p-6'>
          <Waves className='size-10 text-muted-foreground/50' />
        </div>
        <div className='space-y-1'>
          <p className='text-lg font-medium'>Belum ada data pantai</p>
          <p className='text-sm text-muted-foreground'>
            Data pantai dengan koordinat belum tersedia
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 max-w-7xl mx-auto w-full px-4 py-6 md:px-6 lg:px-8'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <h1 className='font-bold text-2xl sm:text-3xl tracking-tight'>
            Peta Interaktif
          </h1>
          <Badge className='bg-sky-500 text-white border-transparent text-[10px] sm:text-xs'>
            Pantai Banten
          </Badge>
        </div>
        <p className='text-muted-foreground text-xs sm:text-sm'>
          Jelajahi rekomendasi pantai terbaik di Provinsi Banten
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-4 h-[calc(100vh-220px)] min-h-[500px] md:min-h-[520px]'>
        {/* Desktop Sidebar (hidden on mobile) */}
        <aside className='hidden md:flex w-72 shrink-0 flex-col gap-3 lg:w-80 min-h-0 overflow-hidden'>
          <div className='relative'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              id='map-search'
              placeholder='Cari nama pantai atau lokasi...'
              className='pl-9 pr-8 text-sm'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type='button'
                onClick={() => setSearchQuery('')}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                aria-label='Hapus pencarian'
              >
                <X className='size-3.5' />
              </button>
            )}
          </div>

          <div className='flex items-center justify-between text-xs text-muted-foreground'>
            <span>
              Menampilkan{' '}
              <span className='font-semibold text-foreground'>
                {filtered.length}
              </span>{' '}
              dari {destinations.length} pantai
            </span>
            {selectedId && (
              <button
                type='button'
                onClick={() => setSelectedId(null)}
                className='flex items-center gap-1 text-primary hover:underline'
              >
                <X className='size-3' /> Batal pilih
              </button>
            )}
          </div>

          <ScrollArea className='flex-1 -mx-1 px-1 overflow-y-auto'>
            <div className='flex flex-col gap-2 pb-2'>
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
                <div className='flex flex-col items-center gap-2 py-12 text-center text-muted-foreground'>
                  <Waves className='size-8 opacity-30' />
                  <p className='text-sm'>Pantai tidak ditemukan</p>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setSearchQuery('')}
                  >
                    Reset pencarian
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Map Container */}
        <div className='relative flex-1 overflow-hidden rounded-xl border border-border shadow-sm'>
          {/* Mobile Floating Search/List Bar (hidden on desktop) */}
          <div className='absolute top-3 left-3 right-3 z-10 md:hidden flex gap-2'>
            <div className='relative flex-1'>
              <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder='Cari pantai...'
                className='pl-9 pr-8 text-xs bg-background/95 border-border shadow-md backdrop-blur-xs h-9'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type='button'
                  onClick={() => setSearchQuery('')}
                  className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                >
                  <X className='size-3.5' />
                </button>
              )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='shrink-0 bg-background/95 border-border shadow-md backdrop-blur-xs h-9 gap-1.5 text-xs px-2.5'
                >
                  <ListFilter className='size-3.5' />
                  <span>Daftar ({filtered.length})</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-[85vw] sm:w-[380px] p-4 flex flex-col gap-4'
              >
                <SheetHeader className='pb-2'>
                  <SheetTitle className='text-base font-semibold'>
                    Daftar Pantai Banten
                  </SheetTitle>
                </SheetHeader>
                <div className='text-xs text-muted-foreground -mt-2'>
                  Menampilkan{' '}
                  <span className='font-semibold text-foreground'>
                    {filtered.length}
                  </span>{' '}
                  pantai
                </div>
                <ScrollArea className='flex-1 overflow-y-auto pr-1'>
                  <div className='flex flex-col gap-2 pb-4'>
                    {filtered.length > 0 ? (
                      filtered.map((dest) => (
                        <DestinationListItem
                          key={dest.id}
                          destination={dest}
                          isSelected={selectedId === dest.id}
                          onClick={() => handleSelectFromList(dest.id)}
                        />
                      ))
                    ) : (
                      <div className='flex flex-col items-center gap-2 py-12 text-center text-muted-foreground'>
                        <Waves className='size-8 opacity-30' />
                        <p className='text-xs'>Pantai tidak ditemukan</p>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 text-xs'
                          onClick={() => setSearchQuery('')}
                        >
                          Reset pencarian
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <Map
            ref={mapRef}
            center={[106.0, -6.4]}
            zoom={9}
            minZoom={8.5}
            pitch={25}
            className='h-full w-full'
          >
            <MapControls
              position='bottom-right'
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
                hidePopup={isMobile}
              />
            ))}

            {/* Industry Markers & Heatmap */}
            <IndustryLayer
              showMarkers={showIndustryMarkers}
              showHeatmap={showIndustryHeatmap}
            />
          </Map>

          {/* Industry layer toggle controls (top-right of map, below map controls) */}
          <div className='absolute top-3 right-3 z-10 hidden md:flex flex-col gap-1.5'>
            <IndustryLegend
              showMarkers={showIndustryMarkers}
              showHeatmap={showIndustryHeatmap}
              onToggleMarkers={() => setShowIndustryMarkers((v) => !v)}
              onToggleHeatmap={() => setShowIndustryHeatmap((v) => !v)}
            />
          </div>

          {/* Mobile industry toggle (bottom-left area) */}
          <div className='absolute bottom-3 right-3 z-10 md:hidden flex flex-col gap-1.5'>
            <IndustryLegend
              showMarkers={showIndustryMarkers}
              showHeatmap={showIndustryHeatmap}
              onToggleMarkers={() => setShowIndustryMarkers((v) => !v)}
              onToggleHeatmap={() => setShowIndustryHeatmap((v) => !v)}
            />
          </div>

          {/* Info overlay (hidden on mobile when a card is selected) */}
          <div
            className={cn(
              'absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 text-[11px] shadow-sm backdrop-blur-sm transition-opacity',
              selectedId ? 'opacity-0 md:opacity-100' : 'opacity-100',
            )}
          >
            <div className='size-2 rounded-full bg-sky-500' />
            <span className='text-muted-foreground'>
              Pantai · Provinsi Banten
            </span>
          </div>

          {/* Mobile Floating Detail Card (hidden on desktop) */}
          {selectedBeach && selectedAnalysis && (
            <div className='absolute bottom-3 left-3 right-3 z-10 md:hidden animate-in slide-in-from-bottom duration-300'>
              <Card className='border border-border/80 shadow-lg bg-background/95 backdrop-blur-md'>
                <CardContent className='p-4 space-y-3'>
                  {/* Header details */}
                  <div className='flex items-start justify-between gap-2'>
                    <div className='min-w-0 flex-1'>
                      <h3 className='text-sm font-semibold leading-tight text-foreground truncate'>
                        {selectedBeach.pantai}
                      </h3>
                      <div className='mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground'>
                        <MapPin className='size-3 shrink-0' />
                        <span className='truncate'>
                          {selectedBeach.kecamatan}
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 shrink-0'>
                      <Badge
                        variant='outline'
                        className={cn(
                          'text-[9px] px-1.5 py-0 h-4.5 whitespace-nowrap',
                          statusConfig[selectedBeach.status].className,
                        )}
                      >
                        {statusConfig[selectedBeach.status].label}
                      </Badge>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='size-6 rounded-full hover:bg-muted'
                        onClick={() => setSelectedId(null)}
                      >
                        <X className='size-3.5' />
                      </Button>
                    </div>
                  </div>

                  {/* Environment Score Row */}
                  {selectedAnalysis.score !== null && (
                    <div className='flex items-center gap-3 rounded-lg bg-muted/40 px-2.5 py-1.5'>
                      <div className='relative flex size-8 items-center justify-center shrink-0'>
                        <svg className='size-8 -rotate-90' viewBox='0 0 36 36'>
                          <circle
                            cx='18'
                            cy='18'
                            r='15'
                            fill='none'
                            className='stroke-muted'
                            strokeWidth='3'
                          />
                          <circle
                            cx='18'
                            cy='18'
                            r='15'
                            fill='none'
                            className={cn(
                              'transition-all duration-500',
                              selectedAnalysis.score >= 70
                                ? 'stroke-emerald-500'
                                : selectedAnalysis.score >= 40
                                  ? 'stroke-amber-500'
                                  : 'stroke-red-500',
                            )}
                            strokeWidth='3'
                            strokeDasharray={`${(selectedAnalysis.score / 100) * 94.2} 94.2`}
                            strokeLinecap='round'
                          />
                        </svg>
                        <span className='absolute text-[9px] font-bold'>
                          {selectedAnalysis.score}
                        </span>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-[11px] font-medium leading-none text-foreground'>
                          Skor Lingkungan
                        </p>
                        <p className='text-[9px] text-muted-foreground mt-0.5 truncate'>
                          Kualitas: {selectedAnalysis.waterQuality}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Quality Metrics badges */}
                  <div className='grid grid-cols-3 gap-1.5 text-center'>
                    <div className='flex flex-col items-center justify-center rounded bg-muted/30 py-1 text-[9px]'>
                      <Droplets className='size-3 text-sky-500' />
                      <span className='text-[8px] text-muted-foreground mt-0.5'>
                        Air
                      </span>
                      <span className='font-semibold text-foreground mt-0.5 truncate max-w-full px-1'>
                        {selectedAnalysis.waterQuality}
                      </span>
                    </div>
                    <div className='flex flex-col items-center justify-center rounded bg-muted/30 py-1 text-[9px]'>
                      <Shield className='size-3 text-emerald-500' />
                      <span className='text-[8px] text-muted-foreground mt-0.5'>
                        Aman
                      </span>
                      <span className='font-semibold text-foreground mt-0.5 truncate max-w-full px-1'>
                        {selectedAnalysis.safetyStatus}
                      </span>
                    </div>
                    <div className='flex flex-col items-center justify-center rounded bg-muted/30 py-1 text-[9px]'>
                      <Sparkles className='size-3 text-amber-500' />
                      <span className='text-[8px] text-muted-foreground mt-0.5'>
                        Bersih
                      </span>
                      <span className='font-semibold text-foreground mt-0.5 truncate max-w-full px-1'>
                        {selectedAnalysis.cleanliness}
                      </span>
                    </div>
                  </div>

                  {/* Recommendation Summary */}
                  <p className='text-[11px] leading-normal text-muted-foreground line-clamp-2'>
                    {selectedAnalysis.recommendation}
                  </p>

                  {/* Details Link CTA */}
                  <Button
                    asChild
                    size='sm'
                    className='w-full gap-1 text-[11px] h-8 mt-1'
                  >
                    <Link href={`/explore/${selectedBeach.slug}`}>
                      <Activity className='size-3' />
                      <span>Lihat Analisis Lengkap</span>
                      <ChevronRight className='size-3' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
