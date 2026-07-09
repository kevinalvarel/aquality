import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScanSearch } from "lucide-react";
import type { BeachApiResponse } from "@/types/beach-api.type";

interface DetectedObjectsProps {
  data: BeachApiResponse;
}

export function DetectedObjects({ data }: DetectedObjectsProps) {
  const detectedObjects = [
    { label: data.pantai, variant: "default" as const },
    { label: `Kecamatan: ${data.kecamatan}`, variant: "secondary" as const },
    { 
      label: `Kualitas: ${data.status_kualitas_2026}`, 
      variant: data.status_kualitas_2026.toUpperCase() === "SEHAT" ? ("default" as const) : ("destructive" as const) 
    },
    { label: `Tren: ${data.tren_kualitas}`, variant: "outline" as const },
    { label: `Dampak: ${data.kategori_dampak_industri}`, variant: "secondary" as const },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <ScanSearch className="size-4 text-primary" />
          Faktor Pantai Terdeteksi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {detectedObjects.map((obj) => (
            <Badge key={obj.label} variant={obj.variant} className="text-xs">
              {obj.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

