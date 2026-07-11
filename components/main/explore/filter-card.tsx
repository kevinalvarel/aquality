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

import { cn } from "@/lib/utils";

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

interface FilterCardProps {
  className?: string;
  flat?: boolean;
  selectedHealth: string[];
  onChangeHealth: (value: string[]) => void;
  crowded: string;
  onChangeCrowded: (value: string) => void;
  selectedDistance: string[];
  onChangeDistance: (value: string[]) => void;
}

export function FilterCard({
  className,
  flat = false,
  selectedHealth,
  onChangeHealth,
  crowded,
  onChangeCrowded,
  selectedDistance,
  onChangeDistance,
}: FilterCardProps) {
  const content = (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Berdasarkan Skor Kualitas Air
      </h2>
      <div className="flex flex-col gap-2.5">
        {healthFilters.map((filter) => (
          <div key={filter.value} className="flex items-center gap-3">
            <Checkbox
              id={filter.value}
              checked={selectedHealth.includes(filter.value)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChangeHealth([...selectedHealth, filter.value]);
                } else {
                  onChangeHealth(selectedHealth.filter((v) => v !== filter.value));
                }
              }}
            />
            <Label
              htmlFor={filter.value}
              className="text-sm font-medium cursor-pointer"
            >
              {filter.label}
            </Label>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-4">
        Tingkat Keramaian
      </h2>
      <div className="flex flex-col gap-2.5">
        <RadioGroup value={crowded} onValueChange={onChangeCrowded}>
          {crowdedFilters.map((filter) => (
            <div key={filter.value} className="flex items-center gap-3">
              <RadioGroupItem value={filter.value} id={filter.value} />
              <Label
                htmlFor={filter.value}
                className="text-sm font-medium cursor-pointer"
              >
                {filter.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-4">
        Jarak dari Industri
      </h2>
      <div className="flex flex-col gap-2.5">
        {distanceFilter.map((filter) => (
          <div key={filter.value} className="flex items-center gap-3">
            <Checkbox
              id={filter.value}
              checked={selectedDistance.includes(filter.value)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChangeDistance([...selectedDistance, filter.value]);
                } else {
                  onChangeDistance(
                    selectedDistance.filter((v) => v !== filter.value),
                  );
                }
              }}
            />
            <Label
              htmlFor={filter.value}
              className="text-sm font-medium cursor-pointer"
            >
              {filter.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  if (flat) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Card className={cn("sticky", className)}>
      <CardHeader>
        <CardTitle>Filter Pencarian</CardTitle>
        <CardDescription>Jelajahi destinasi cita-citamu</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
