import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScanSearch } from "lucide-react";

const detectedObjects = [
  { label: "Sampah Plastik", variant: "destructive" as const },
  { label: "Rumput Laut", variant: "secondary" as const },
  { label: "Batu", variant: "outline" as const },
  { label: "Pasir", variant: "outline" as const },
  { label: "Air Laut", variant: "default" as const },
  { label: "Vegetasi", variant: "secondary" as const },
];

export function DetectedObjects() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <ScanSearch className="size-4 text-primary" />
          Objek Terdeteksi
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
