import { Button } from "@/components/ui/button";
import { ImagePlus, Waves } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 py-20">
      <div className="mb-4 rounded-2xl bg-primary/10 p-5">
        <Waves className="size-10 text-primary" />
      </div>
      <h3 className="text-lg font-semibold">No beach analyses yet.</h3>
      <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
        Upload your first beach image to begin AI analysis.
      </p>
      <Button className="mt-6">
        <ImagePlus className="size-4" />
        Analyze Image
      </Button>
    </div>
  );
}
