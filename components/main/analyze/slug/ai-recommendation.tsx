import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import type { AnalyzeApiResponse } from "@/types/beach-api.type";

interface AIRecommendationProps {
  data: AnalyzeApiResponse;
}

function parseMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function AIRecommendation({ data }: AIRecommendationProps) {
  return (
    <Alert className="border-primary/20 bg-primary/5">
      <Lightbulb className="size-4 text-primary" />
      <AlertTitle className="font-semibold">Penjelasan Kualitas AI</AlertTitle>
      <AlertDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {parseMarkdown(data.penjelasan_kualitas)}
      </AlertDescription>
    </Alert>
  );
}
