import { Button } from "@/components/ui/button";
import { ArrowRight, Map } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
      <Button size="lg" className="px-7 gap-2 text-sm group" asChild>
        <Link href="/explore">
          Jelajahi Pantai
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="px-7 gap-2 text-sm"
        asChild
      >
        <Link href="/map">
          <Map className="size-4" />
          Lihat Peta Interaktif
        </Link>
      </Button>
    </div>
  );
}
