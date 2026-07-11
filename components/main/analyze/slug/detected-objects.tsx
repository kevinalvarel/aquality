import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScanSearch } from "lucide-react";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";
import { extractStatusFromExplanation } from "@/lib/utils";

interface DetectedObjectsProps {
  data: AnalyzeApiResponse;
}

export function DetectedObjects({ data }: DetectedObjectsProps) {
  const statusEnv = extractStatusFromExplanation(data.penjelasan_kualitas);
  const isLestari = statusEnv.toUpperCase().includes("LESTARI") || statusEnv.toUpperCase().includes("BAIK");

  const detectedObjects = [
    { label: data.pantai, variant: "default" as const },
    { label: `Kecamatan: ${data.Kecamatan}`, variant: "secondary" as const },
    { 
      label: `Kelayakan: ${statusEnv}`, 
      variant: isLestari ? ("default" as const) : ("destructive" as const) 
    },
    { label: `Dampak Industri: ${data.kategori_dampak_industri}`, variant: "secondary" as const },
    { label: `${data.industri_terdekat} (${data.tipe_industri})`, variant: "outline" as const },
    ...(data.industri_terdekat_2 ? [{ label: `${data.industri_terdekat_2} (${data.tipe_industri_2})`, variant: "outline" as const }] : []),
    ...(data.industri_terdekat_3 ? [{ label: `${data.industri_terdekat_3} (${data.tipe_industri_3})`, variant: "outline" as const }] : []),
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
