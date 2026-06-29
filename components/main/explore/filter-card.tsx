import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

const healthFilters = [
  {
    label: "Sehat",
    value: "sehat",
  },
  {
    label: "Sedang",
    value: "sedang",
  },
  {
    label: "Tidak Sehat",
    value: "tidak-sehat",
  },
];

const crowdedFilters = [
  {
    value: "sepi",
    label: "Sepi",
  },
  {
    value: "tidak-terlalu-ramai",
    label: "Tidak terlalu ramai",
  },
  {
    value: "ramai",
    label: "Ramai",
  },
];
const distanceFilter = [
  {
    value: "kurang-dari-2km",
    label: "Kurang dari 2 km",
  },
  {
    value: "antara-2km-5km",
    label: "Antara 2km - 5km",
  },
  {
    value: "lebih-dari-5km",
    label: "Lebih dari 5km",
  },
];

export function FilterCard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Filter Pencarian</CardTitle>
          <CardDescription>Jelajahi destinasi cita-citamu</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <h2 className="text-md font-medium">Berdasarkan Skor Kualitas Air</h2>
          {healthFilters.map((filter) => (
            <div key={filter.value}>
              <div className="flex items-center gap-3">
                <Checkbox value={filter.value} id={filter.value} />
                <Label htmlFor={filter.value}>{filter.label}</Label>
              </div>
            </div>
          ))}
          <h2>Tingkat Keramaian</h2>
          <div className="flex flex-col gap-2 ">
            <RadioGroup defaultValue="sepi">
              {crowdedFilters.map((filter) => (
                <div key={filter.value}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={filter.value} id={filter.value} />
                    <Label htmlFor={filter.value}>{filter.label}</Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          <h2>Jarak dari Industri</h2>
          <div className="flex flex-col gap-4">
            {distanceFilter.map((filter) => (
              <div key={filter.value}>
                <div className="flex items-center gap-3">
                  <Checkbox value={filter.value} id={filter.value} />
                  <Label htmlFor={filter.value}>{filter.label}</Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
