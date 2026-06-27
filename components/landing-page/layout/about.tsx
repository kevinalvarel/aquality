import { Droplets, Wind, Users } from "lucide-react";

const indexTypes = [
  {
    icon: <Droplets className="size-5" />,
    label: "Kualitas Air",
    color: "text-primary",
    bgColor: "bg-primary/8",
    desc: "pH, salinitas, dan tingkat polutan berbahaya.",
  },
  {
    icon: <Wind className="size-5" />,
    label: "Polusi Udara",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
    desc: "Indeks AQI dan partikel PM2.5 di sekitar pantai.",
  },
  {
    icon: <Users className="size-5" />,
    label: "Keramaian",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
    desc: "Estimasi kepadatan pengunjung per pantai.",
  },
];

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
                Tentang Aquality
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
                Mengetahui Kondisi Pantai{" "}
                <span className="text-primary">Sebelum Berkunjung</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Aquality mengumpulkan dan memvisualisasikan data kualitas
                lingkungan pantai-pantai di wilayah Banten secara nyata.
                Dengan data polusi, pencemaran air, dan keramaian, wisatawan
                dan peneliti dapat membuat keputusan yang lebih cerdas.
              </p>
            </div>

            {/* Detail items */}
            <div className="space-y-5">
              <AboutDetail
                number="01"
                title="Data Akurat & Terkini"
                description="Indeks kualitas air diperbarui berkala dari sensor lapangan dan data satelit lingkungan."
              />
              <AboutDetail
                number="02"
                title="18+ Pantai Banten Terpantau"
                description="Dari Pantai Anyer, Carita, Sawarna, hingga Tanjung Lesung — semua dalam satu platform."
              />
              <AboutDetail
                number="03"
                title="Peringatan Dini Pencemaran"
                description="Notifikasi otomatis ketika indeks polusi atau pencemaran air melewati ambang aman."
              />
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="relative">
            <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/[0.03] p-8 sm:p-10 overflow-hidden">
              {/* Decorative dot pattern */}
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
                    &ldquo;Membantu masyarakat dan peneliti mengetahui
                    kondisi nyata pantai Banten — bersih, aman, dan layak
                    dikunjungi.&rdquo;
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-border/80 via-primary/20 to-transparent" />

                {/* Index Icons */}
                <div className="grid grid-cols-3 gap-4">
                  {indexTypes.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-2.5 py-3"
                    >
                      <div
                        className={`flex items-center justify-center size-11 rounded-xl ${item.bgColor} ${item.color} transition-transform hover:scale-105`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground text-center">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sample beach quality scores */}
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                    Skor Kualitas Hari Ini
                  </p>
                  <BeachScore name="Pantai Anyer" score={82} level="Baik" color="emerald" />
                  <BeachScore name="Pantai Carita" score={67} level="Sedang" color="amber" />
                  <BeachScore name="Pantai Sawarna" score={91} level="Sangat Baik" color="emerald" />
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-cyan-500/5 blur-2xl" />
            </div>

            {/* Floating decorators */}
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full border border-primary/20 bg-background" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full border border-cyan-500/20 bg-background" />
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

function BeachScore({
  name,
  score,
  level,
  color,
}: {
  name: string;
  score: number;
  level: string;
  color: "emerald" | "amber" | "red";
}) {
  const colorMap = {
    emerald: {
      bar: "bg-emerald-500",
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    amber: {
      bar: "bg-amber-500",
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    red: {
      bar: "bg-red-500",
      badge: "bg-red-500/10 text-red-600 dark:text-red-400",
    },
  };
  const c = colorMap[color];
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-28 flex-shrink-0 truncate">{name}</span>
      <div className="flex-1 h-1.5 bg-border/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${c.bar} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${c.badge}`}>
        {level}
      </span>
    </div>
  );
}
