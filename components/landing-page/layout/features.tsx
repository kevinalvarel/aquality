import {
  Map,
  BarChart3,
  Droplets,
  Wind,
  Users,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Peta Interaktif Banten",
    description:
      "Visualisasi geospasial semua pantai di Banten dengan layer indeks kualitas, polusi, dan keramaian yang dapat dikustomisasi.",
    color: "text-primary",
    bgColor: "bg-primary/8",
    borderColor: "group-hover:border-primary/20",
  },
  {
    icon: Droplets,
    title: "Index Pencemaran Air",
    description:
      "Pantau kadar pH, salinitas, logam berat, dan indikator biologis pencemaran air laut secara berkala.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
    borderColor: "group-hover:border-cyan-500/20",
  },
  {
    icon: Wind,
    title: "Index Polusi Udara",
    description:
      "Monitoring AQI (Air Quality Index) dan konsentrasi partikel PM2.5 di kawasan pantai Banten.",
    color: "text-sky-500",
    bgColor: "bg-sky-500/8",
    borderColor: "group-hover:border-sky-500/20",
  },
  {
    icon: Users,
    title: "Tingkat Keramaian",
    description:
      "Estimasi real-time kepadatan pengunjung di setiap pantai berdasarkan data pergerakan dan input komunitas.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
    borderColor: "group-hover:border-emerald-500/20",
  },
  {
    icon: BarChart3,
    title: "Dashboard Analitik",
    description:
      "Visualisasi tren kualitas pantai mingguan, bulanan, dan tahunan dalam grafik interaktif yang mudah dibaca.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/8",
    borderColor: "group-hover:border-chart-2/20",
  },
  {
    icon: Bell,
    title: "Notifikasi Peringatan",
    description:
      "Dapatkan notifikasi otomatis ketika kondisi pantai melampaui batas aman untuk kunjungan wisatawan.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/8",
    borderColor: "group-hover:border-amber-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">
            Fitur Utama
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
            Semua Informasi yang Anda Butuhkan untuk{" "}
            <span className="text-primary">Pilih Pantai Terbaik</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Aquality menyediakan data lengkap kondisi lingkungan pantai di
            wilayah Banten — dari polusi udara, pencemaran air, hingga
            keramaian pengunjung.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  bgColor,
  borderColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 hover:bg-card hover:shadow-lg ${borderColor}`}
    >
      {/* Icon */}
      <div
        className={`flex items-center justify-center size-11 rounded-xl ${bgColor} ${color} mb-5 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="size-5" />
      </div>

      {/* Content */}
      <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Hover accent line */}
      <div
        className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-current to-transparent ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />
    </div>
  );
}
