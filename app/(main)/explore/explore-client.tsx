"use client";

import { Banner } from "@/components/main/explore/banner";
import { FilterCard } from "@/components/main/explore/filter-card";
import { ResultCard } from "@/components/main/explore/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import type { ExploreBeachItem } from "@/types/explore.type";
import { useState } from "react";

interface ExplorePageClientProps {
  beaches: ExploreBeachItem[];
}

export function ExplorePageClient({ beaches }: ExplorePageClientProps) {
  const [showAll, setShowAll] = useState(false);

  function showAllToggle() {
    setShowAll((prev) => !prev);
  }

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen my-6">
      <Banner />
      <div className="max-w-7xl mx-auto flex flex-col gap-3 my-8">
        <h1 className="text-4xl font-bold">Halo {user?.name}</h1>
        <p className="text-muted-foreground">Mau liburan kemana hari ini?</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="sticky top-25 col-span-1 h-fit">
          <FilterCard />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-base font-medium">Seluruh Pantai</h1>
                  <p className="text-sm text-muted-foreground">
                    Berikut adalah Analisa pantai di Provinsi Banten
                  </p>
                </div>
                <div>
                  <h2 className="text-base font-bold text-primary">
                    {beaches.length} ditemukan
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-3">
            {!showAll ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <ResultCard beaches={beaches.slice(0, 3)} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <ResultCard beaches={beaches} />
              </div>
            )}
            {beaches.length > 0 && (
              <Button
                onClick={showAllToggle}
                className="w-full text-primary"
                variant="outline"
              >
                {!showAll ? "Muat lebih banyak" : "Tampilkan lebih sedikit"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
