import { Button } from "@/components/ui/button";
import { Waves, RefreshCw } from "lucide-react";

interface LeaderboardEmptyProps {
  onRefresh?: () => void;
}

export function LeaderboardEmpty({ onRefresh }: LeaderboardEmptyProps) {
  return (
    <section
      id="leaderboard-empty"
      className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center"
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
        <Waves className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">No leaderboard data available.</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Beach rankings will appear here once AI analysis data is available. Try
        refreshing or check back later.
      </p>
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          className="mt-5 gap-1.5"
          onClick={onRefresh}
          id="empty-refresh-btn"
        >
          <RefreshCw className="size-3.5" data-icon="inline-start" />
          Refresh Data
        </Button>
      )}
    </section>
  );
}
