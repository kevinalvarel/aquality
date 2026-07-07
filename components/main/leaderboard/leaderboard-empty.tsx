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
      <h3 className="text-lg font-semibold">Data peringkat tidak tersedia.</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Peringkat pantai akan muncul di sini setelah data analisis AI tersedia. Coba
        perbarui data atau periksa kembali nanti.
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
          Perbarui Data
        </Button>
      )}
    </section>
  );
}
