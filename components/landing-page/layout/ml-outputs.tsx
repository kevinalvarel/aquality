import { Droplets, Activity, Factory, MapPin, FileText } from "lucide-react";

const outputs = [
  {
    icon: Droplets,
    label: "Persentase Air Sehat",
    value: "82%",
    description: "Persentase sampel air yang memenuhi standar air bersih.",
    color: "text-primary",
    bgColor: "bg-primary/8",
    sample: "Pantai Sawarna",
  },
  {
    icon: Activity,
    label: "Status Kualitas Air",
    value: "Baik",
    description: "Klasifikasi kualitas keseluruhan berdasarkan indikator lingkungan.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
    sample: "Pantai Anyer",
  },
  {
    icon: Factory,
    label: "Dampak Industri",
    value: "Rendah",
    description: "Tingkat dampak aktivitas industri terdekat terhadap pesisir.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/8",
    sample: "Pantai Carita",
  },
  {
    icon: MapPin,
    label: "Industri Terdekat",
    value: "4.2 km",
    description: "Jarak ke sumber industri teridentifikasi terdekat dari pantai.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
    sample: "Pantai Karang Bolong",
  },
  {
    icon: FileText,
    label: "Ringkasan Lingkungan",
    value: "Dianalisis",
    description: "Ringkasan yang dihasilkan AI tentang kondisi lingkungan pantai secara keseluruhan.",
    color: "text-sky-500",
    bgColor: "bg-sky-500/8",
    sample: "Semua Pantai",
  },
];

export function MLOutputs() {
  return (
    <section id="ml-outputs" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">
            Machine Learning
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
            Apa yang AI{" "}
            <span className="text-primary">Prediksi untuk Setiap Pantai</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Model machine learning Aquality menghasilkan keluaran yang dapat
            ditindaklanjuti untuk setiap pantai terpantau — memberikan Anda
            gambaran lengkap kualitas air pesisir secara sekilas.
          </p>
        </div>

        {/* Outputs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {outputs.slice(0, 3).map((output) => (
            <OutputCard key={output.label} {...output} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-5 max-w-2xl mx-auto">
          {outputs.slice(3).map((output) => (
            <OutputCard key={output.label} {...output} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutputCard({
  icon: Icon,
  label,
  value,
  description,
  color,
  bgColor,
  sample,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  description: string;
  color: string;
  bgColor: string;
  sample: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 sm:p-7 transition-all duration-300 hover:bg-card hover:shadow-lg hover:border-border/60">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center justify-center size-11 rounded-xl ${bgColor} ${color} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="size-5" />
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${bgColor} ${color}`}>
          {sample}
        </span>
      </div>

      {/* Value */}
      <div className="mb-2">
        <span className={`text-2xl font-semibold tracking-tight ${color}`}>
          {value}
        </span>
      </div>

      {/* Label & Description */}
      <h3 className="text-sm font-medium text-foreground mb-1.5">{label}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

      {/* Hover accent line */}
      <div
        className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-current to-transparent ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
      />
    </div>
  );
}
