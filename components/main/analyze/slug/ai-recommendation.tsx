import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, CheckCircle2 } from "lucide-react";

const recommendations = [
  "Beach is suitable for recreational activities.",
  "Continue weekly monitoring.",
  "Maintain waste management around shoreline.",
  "No significant pollution detected.",
];

export function AIRecommendation() {
  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Lightbulb className="size-4 text-primary" />
      <AlertTitle className="font-semibold">AI Recommendation</AlertTitle>
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
