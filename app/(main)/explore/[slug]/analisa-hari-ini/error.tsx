"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AnalisisHariIniError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Weather analysis page error:", error);
  }, [error]);

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center space-y-6 px-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl" />
        <div className="relative rounded-full bg-rose-500/10 p-5 ring-1 ring-rose-500/20">
          <AlertTriangle className="size-8 text-rose-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">
          Gagal Memuat Analisis Cuaca
        </h2>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Terjadi kesalahan saat mengambil data prakiraan cuaca. Hal ini bisa
          disebabkan oleh masalah koneksi atau server BMKG sedang tidak
          tersedia.
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/explore">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Kembali
          </Button>
        </Link>
        <Button onClick={() => unstable_retry()} className="gap-2">
          <RefreshCw className="size-4" />
          Coba Lagi
        </Button>
      </div>
    </div>
  );
}
