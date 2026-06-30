import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Sparkles, CheckCircle2 } from "lucide-react";

const insights = [
  "Most beaches analyzed this month are classified as Good.",
  "Water clarity has improved compared to last week.",
  "Three beaches require additional monitoring due to increased turbidity.",
  "AI confidence remains consistently above 95%.",
];

export function AIInsightsCard() {
  return (
    <Card className="relative overflow-hidden border-primary/20">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5" />
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Sparkles className="size-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">AI Insights</CardTitle>
            <CardDescription>
              Automatically generated analysis summary
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <ul className="space-y-3">
          {insights.map((insight) => (
            <li key={insight} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                {insight}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
