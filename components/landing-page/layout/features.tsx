import {
  Map,
  BarChart3,
  Droplets,
  Brain,
  Factory,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Peta Interaktif",
    description:
      "Visualisasi geospasial semua pantai terpantau dengan overlay kualitas air, zona industri, dan lapisan data lingkungan.",
    color: "text-primary",
    bgColor: "bg-primary/8",
    borderColor: "group-hover:border-primary/20",
  },
  {
    icon: Droplets,
    title: "Prediksi Kualitas Air",
    description:
      "Prediksi bertenaga AI untuk kualitas air pesisir menggunakan model machine learning yang dilatih dengan data lingkungan dan industri.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
    borderColor: "group-hover:border-cyan-500/20",
  },
  {
    icon: Brain,
    title: "Analisis Pantai",
    description:
      "Analisis lingkungan mendalam per pantai — mencakup persentase air sehat, status kualitas, dan ringkasan ekosistem.",
    color: "text-sky-500",
    bgColor: "bg-sky-500/8",
    borderColor: "group-hover:border-sky-500/20",
  },
  {
    icon: Factory,
    title: "Analisis Dampak Industri",
    description:
      "Nilai dampak industri terdekat terhadap kualitas air, termasuk jarak, kategori, dan kontribusi pencemaran.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
    borderColor: "group-hover:border-emerald-500/20",
  },
  {
    icon: BarChart3,
    title: "Analisis Historis",
    description:
      "Jelajahi tren kualitas air historis, pola musiman, dan perubahan lingkungan jangka panjang di seluruh pantai.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/8",
    borderColor: "group-hover:border-chart-2/20",
  },
  {
    icon: Trophy,
    title: "Papan Peringkat Kualitas",
    description:
      "Peringkat pantai berdasarkan skor indeks kualitas air — membantu pengguna dengan cepat mengidentifikasi destinasi pesisir terbersih dan teraman.",
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
            Fitur Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
            Semua yang Anda Butuhkan untuk{" "}
            <span className="text-primary">Kecerdasan Air Pesisir</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Aquality menggabungkan AI, machine learning, dan data lingkungan
            untuk memberikan wawasan komprehensif tentang kualitas air pesisir —
            mulai dari dampak industri hingga prediksi waktu nyata.
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

