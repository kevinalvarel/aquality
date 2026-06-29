import { FilterCard } from "@/components/main/explore/filter-card";
import { ResultCard } from "@/components/main/explore/result-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExplorePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      <div className="col-span-1">
        <FilterCard />
      </div>
      <div className="col-span-2 flex flex-col gap-3">
        <Card>
          <CardContent>
            <h1 className="text-md font-medium">Hasil Pencarian</h1>
            <p className="text-sm text-muted-foreground">
              Berikut adalah rekomendasi destinasi berdasarkan preferensi Anda
            </p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ResultCard />
        </div>
      </div>
    </div>
  );
}
