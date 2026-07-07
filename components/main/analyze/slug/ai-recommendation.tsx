import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const recommendations = [
  "Pantai cocok untuk aktivitas rekreasi.",
  "Lanjutkan pemantauan mingguan.",
  "Pertahankan pengelolaan sampah di sekitar garis pantai.",
  "Tidak ada polusi signifikan yang terdeteksi.",
];

export function AIRecommendation() {
  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Lightbulb className="size-4 text-primary" />
      <AlertTitle className="font-semibold">Rekomendasi AI</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-2">
          {recommendations.map((rec) => (
            <li key={rec} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
