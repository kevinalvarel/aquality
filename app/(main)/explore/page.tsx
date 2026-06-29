import { FilterCard } from "@/components/main/explore/filter-card";
import { ResultCard } from "@/components/main/explore/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 my-6">
        <h1 className="text-4xl font-bold">Selamat Datang Kevin</h1>
        <p className="text-muted-foreground">Mau liburan kemana hari ini?</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <FilterCard />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-base font-medium">Temukan destinasi</h1>
                  <p className="text-sm text-muted-foreground">
                    Berikut adalah rekomendasi destinasi berdasarkan preferensi
                    Anda
                  </p>
                </div>
                <div>
                  <h2 className="text-base font-bold text-primary">
                    18 ditemukan
                  </h2>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ResultCard />
            </div>
            <Button className="w-full text-primary" variant="outline">
              Muat lebih banyak
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
