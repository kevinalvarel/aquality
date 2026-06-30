import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScanSearch } from "lucide-react";

const detectedObjects = [
  { label: "Plastic Waste", variant: "destructive" as const },
  { label: "Seaweed", variant: "secondary" as const },
  { label: "Rocks", variant: "outline" as const },
  { label: "Sand", variant: "outline" as const },
  { label: "Ocean Water", variant: "default" as const },
  { label: "Vegetation", variant: "secondary" as const },
];

export function DetectedObjects() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <ScanSearch className="size-4 text-primary" />
          Detected Objects
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
