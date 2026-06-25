import { Waves, Shield, Globe } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Tentang Platform
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
                Teknologi Modern untuk{" "}
                <span className="text-primary">Perlindungan Pesisir</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Coast Vision mengintegrasikan data spasial, citra satelit, dan
                analisis berbasis web untuk memberikan pemantauan pesisir yang
                komprehensif dan real-time kepada peneliti dan pengelola
                lingkungan.
              </p>
            </div>

            {/* Detail items */}
            <div className="space-y-5">
              <AboutDetail
                number="01"
                title="Pemantauan Real-Time"
                description="Data pesisir diperbarui secara berkala dengan integrasi citra satelit terkini."
              />
              <AboutDetail
                number="02"
                title="Analisis Terintegrasi"
                description="Abrasi pantai, kesehatan mangrove, dan perubahan garis pantai dalam satu dashboard."
              />
              <AboutDetail
                number="03"
                title="Akses Terbuka"
                description="Platform berbasis web yang dapat diakses dari mana saja tanpa perangkat lunak khusus."
              />
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="relative">
            <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/[0.03] p-8 sm:p-10 overflow-hidden">
              {/* Decorative grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative space-y-8">
                {/* Mission statement */}
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Misi Kami
                  </p>
                  <p className="text-lg font-medium text-foreground leading-relaxed">
                    &ldquo;Menyediakan alat pemantauan pesisir yang akurat dan
                    mudah diakses untuk mendukung pengambilan keputusan berbasis
                    data dalam pengelolaan wilayah pantai Indonesia.&rdquo;
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-border/80 via-primary/20 to-transparent" />

                {/* Icons row */}
                <div className="grid grid-cols-3 gap-4">
                  <AboutIcon
                    icon={<Waves className="size-5" />}
                    label="Abrasi"
                    color="text-primary"
                    bgColor="bg-primary/8"
                  />
                  <AboutIcon
                    icon={<Shield className="size-5" />}
                    label="Proteksi"
                    color="text-chart-2"
                    bgColor="bg-chart-2/8"
                  />
                  <AboutIcon
                    icon={<Globe className="size-5" />}
                    label="Geospasial"
                    color="text-green-600 dark:text-green-400"
                    bgColor="bg-green-500/8"
                  />
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-chart-2/5 blur-2xl" />
            </div>

            {/* Floating decorator */}
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full border border-primary/20 bg-background" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full border border-chart-2/20 bg-background" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutDetail({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-4 items-start">
      <span className="flex-shrink-0 mt-0.5 text-xs font-semibold tabular-nums text-primary/50 group-hover:text-primary transition-colors">
        {number}
      </span>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function AboutIcon({
  icon,
  label,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 py-3">
      <div
        className={`flex items-center justify-center size-11 rounded-xl ${bgColor} ${color} transition-transform hover:scale-105`}
      >
        {icon}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
