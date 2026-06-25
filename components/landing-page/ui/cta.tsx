import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section id="cta" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/95 dark:from-card dark:via-card dark:to-card/95" />

          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 flex flex-col items-center text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/50 dark:text-muted-foreground mb-5">
              Mulai Sekarang
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary-foreground dark:text-foreground leading-snug max-w-2xl">
              Siap Melindungi{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Pesisir Indonesia?
              </span>
            </h2>

            <p className="mt-5 text-primary-foreground/60 dark:text-muted-foreground max-w-lg leading-relaxed">
              Bergabung dengan Coast Vision dan akses alat pemantauan pesisir
              terdepan untuk melindungi wilayah pantai secara lebih efektif.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="px-8 gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/login">Mulai Gratis</Link>
                <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 gap-2 text-sm border-primary-foreground/15 text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground dark:border-border dark:text-foreground dark:hover:bg-muted"
              >
                <Link href="#features">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
