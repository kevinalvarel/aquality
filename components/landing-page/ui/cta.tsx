import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
      <Button size="lg" className="px-7 gap-2 text-sm group">
        <Link href="/login">Mulai Sekarang</Link>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
      <Button variant="outline" size="lg" className="px-7 gap-2 text-sm">
        <Link href="/login">Pelajari Indeks Kualitas</Link>
      </Button>
    </div>
  );
}
