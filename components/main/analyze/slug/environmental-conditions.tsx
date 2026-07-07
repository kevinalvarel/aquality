import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Thermometer,
  Droplets,
  Wind,
  Waves,
  Sun,
} from "lucide-react";

interface ConditionItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const conditions: ConditionItem[] = [
  {
    icon: <Thermometer className="size-4" />,
    label: "Suhu",
    value: "29°C",
    color: "text-orange-500",
  },
  {
    icon: <Droplets className="size-4" />,
    label: "Kelembapan",
    value: "81%",
    color: "text-sky-500",
  },
  {
    icon: <Wind className="size-4" />,
    label: "Angin",
    value: "12 km/jam",
    color: "text-slate-500",
  },
  {
    icon: <Waves className="size-4" />,
    label: "Pasang Surut",
    value: "Tinggi",
    color: "text-cyan-500",
  },
  {
    icon: <Sun className="size-4" />,
    label: "Indeks UV",
    value: "Sedang",
    color: "text-amber-500",
  },
];

export function EnvironmentalConditions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Kondisi Lingkungan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {conditions.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 rounded-lg bg-muted/40 p-2.5 transition-colors hover:bg-muted/70"
            >
              <div className={item.color}>{item.icon}</div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
                <p className="truncate text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
