'use client';

import { Banner } from '@/components/main/explore/banner';
import { FilterCard } from '@/components/main/explore/filter-card';
import { ResultSection } from '@/components/main/explore/result-section';
import { RecommendationSection } from '@/components/main/explore/recommendation-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSession } from '@/lib/auth-client';
import type {
  ExploreBeachItem,
  BeachRecommendation,
} from '@/types/explore.type';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface ExplorePageClientProps {
  beaches: ExploreBeachItem[];
  recommendations: BeachRecommendation[];
}

function getCrowdedness(
  beachName: string,
): 'sepi' | 'tidak-terlalu-ramai' | 'ramai' {
  const code =
    beachName.charCodeAt(0) + beachName.charCodeAt(beachName.length - 1);
  if (code % 3 === 0) return 'sepi';
  if (code % 3 === 1) return 'tidak-terlalu-ramai';
  return 'ramai';
}

export function ExplorePageClient({
  beaches,
  recommendations,
}: ExplorePageClientProps) {
  const [showAll, setShowAll] = useState(false);

  // Filter States
  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);
  const [crowded, setCrowded] = useState<string>('sepi');
  const [selectedDistance, setSelectedDistance] = useState<string[]>([]);

  function showAllToggle() {
    setShowAll((prev) => !prev);
  }

  const { data: session } = useSession();
  const user = session?.user;

  // Filter beaches based on criteria
  const filteredBeaches = beaches.filter((beach) => {
    // 1. Health Filter
    if (selectedHealth.length > 0) {
      const beachHealth =
        beach.status === 'excellent' || beach.status === 'good'
          ? 'sehat'
          : beach.status === 'moderate'
            ? 'sedang'
            : 'tidak-sehat';
      if (!selectedHealth.includes(beachHealth)) {
        return false;
      }
    }

    // 2. Crowded Filter
    if (crowded) {
      const beachCrowded = getCrowdedness(beach.pantai);
      if (beachCrowded !== crowded) {
        return false;
      }
    }

    // 3. Distance Filter
    if (selectedDistance.length > 0) {
      if (beach.jarakIndustriKm === null) return false;

      const isMatch = selectedDistance.some((distType) => {
        if (distType === 'kurang-dari-2km') {
          return beach.jarakIndustriKm! < 2;
        }
        if (distType === 'antara-2km-5km') {
          return beach.jarakIndustriKm! >= 2 && beach.jarakIndustriKm! <= 5;
        }
        if (distType === 'lebih-dari-5km') {
          return beach.jarakIndustriKm! > 5;
        }
        return false;
      });

      if (!isMatch) {
        return false;
      }
    }

    return true;
  });

  const filterCardProps = {
    selectedHealth,
    onChangeHealth: setSelectedHealth,
    crowded,
    onChangeCrowded: setCrowded,
    selectedDistance,
    onChangeDistance: setSelectedDistance,
  };

  return (
    <div className='min-h-screen px-4 py-6 md:px-6 lg:px-8 space-y-6'>
      <Banner />

      <div className='max-w-7xl mx-auto flex flex-col gap-1.5 mt-4 mb-2'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight'>
          Halo {user?.name}
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Mau liburan kemana hari ini?
        </p>
      </div>

      <RecommendationSection recommendations={recommendations} />

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Desktop Filter Sidebar */}
        <div className='hidden md:block sticky top-25 col-span-1 h-fit'>
          <FilterCard {...filterCardProps} />
        </div>

        {/* Content Area */}
        <div className='col-span-1 md:col-span-2 flex flex-col gap-4'>
          <Card>
            <CardContent className='py-4'>
              <div className='flex items-center justify-between gap-4'>
                <div>
                  <h2 className='text-sm sm:text-base font-semibold'>
                    Seluruh Pantai
                  </h2>
                  <p className='text-xs sm:text-sm text-muted-foreground'>
                    Berikut adalah Analisa pantai di Provinsi Banten
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-xs sm:text-sm font-bold text-primary whitespace-nowrap'>
                    {filteredBeaches.length} ditemukan
                  </span>

                  {/* Mobile Filter Sheet Button */}
                  <div className='md:hidden'>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant='outline'
                          size='sm'
                          className='gap-2 h-9 px-3'
                        >
                          <SlidersHorizontal className='size-4' />
                          <span>Filter</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side='right'
                        className='w-[85vw] sm:w-[400px] p-6 overflow-y-auto'
                      >
                        <SheetHeader className='mb-4'>
                          <SheetTitle>Filter Pencarian</SheetTitle>
                        </SheetHeader>
                        <FilterCard
                          flat
                          className='mt-2'
                          {...filterCardProps}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='flex flex-col gap-4'>
            {!showAll ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                <ResultSection beaches={filteredBeaches.slice(0, 3)} />
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                <ResultSection beaches={filteredBeaches} />
              </div>
            )}

            {filteredBeaches.length > 0 && (
              <Button
                onClick={showAllToggle}
                className='w-full text-primary'
                variant='outline'
              >
                {!showAll ? 'Muat lebih banyak' : 'Tampilkan lebih sedikit'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
