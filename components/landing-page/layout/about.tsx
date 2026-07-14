import GlowingCard from "@/components/glowing-card";
import { Brain, Activity, Factory } from "lucide-react";

const analysisTypes = [
  {
    icon: <Brain className="size-5" />,
    label: "Prediksi ML",
    color: "text-primary",
    bgColor: "bg-primary/8",
    desc: "Model machine learning memprediksi status kualitas air.",
  },
  {
    icon: <Activity className="size-5" />,
    label: "Kualitas Air",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
    desc: "Persentase air sehat dan indikator lingkungan.",
  },
  {
    icon: <Factory className="size-5" />,
    label: "Dampak Industri",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
    desc: "Jarak dan kategori sumber industri terdekat.",
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
                Kecerdasan Lingkungan Pesisir{" "}
                <span className="text-primary">Bertenaga AI</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Aquality adalah platform pemantauan lingkungan yang menggunakan
                machine learning untuk menganalisis dan memprediksi kualitas air
                pesisir di sepanjang pantai Banten. Dengan mengevaluasi indikator
                lingkungan dan aktivitas industri terdekat, Aquality membantu
                pengunjung, peneliti, dan pembuat kebijakan mengambil keputusan
                berbasis data.
              </p>
            </div>

            {/* Detail items */}
            <div className="space-y-5">
              <AboutDetail
                number="01"
                title="Prediksi Machine Learning"
                description="Model AI yang dilatih dengan data lingkungan memprediksi status kualitas air, memberikan penilaian akurat sebelum Anda berkunjung."
              />
              <AboutDetail
                number="02"
                title="Penilaian Dampak Industri"
                description="Evaluasi kedekatan dan kategori sumber industri di sekitar setiap pantai untuk memahami pengaruhnya terhadap kualitas air."
              />
              <AboutDetail
                number="03"
                title="18+ Pantai Terpantau"
                description="Dari Anyer, Carita, Sawarna, hingga Tanjung Lesung — semua pantai dianalisis dan diperingkat dalam satu platform."
              />
            </div>
          </div>

          {/* Right: Visual card */}
          <GlowingCard
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#242526"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={["#5795d9", "#2d5bb4", "#dce3e9"]}
            className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/[0.03] p-8 sm:p-10 overflow-hidden"
          >
            <div className="relative space-y-8">
              {/* Mission statement */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Misi Kami
                </p>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  &ldquo;Memberdayakan komunitas dan peneliti dengan wawasan
                  berbasis AI tentang kualitas air pesisir — menjadikan data
                  lingkungan dapat diakses oleh semua orang.&rdquo;
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-border/80 via-primary/20 to-transparent" />

              {/* Analysis Icons */}
              <div className="grid grid-cols-3 gap-4">
                {analysisTypes.map((item) => (
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
                  Indeks Kualitas Air Hari Ini
                </p>
                <BeachScore
                  name="Pantai Anyer"
                  score={82}
                  level="Sehat"
                  color="emerald"
                />
                <BeachScore
                  name="Pantai Carita"
                  score={67}
                  level="Sedang"
                  color="amber"
                />
                <BeachScore
                  name="Pantai Sawarna"
                  score={91}
                  level="Sangat Baik"
                  color="emerald"
                />
              </div>
            </div>
          </GlowingCard>
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
      <span className="text-xs text-muted-foreground w-28 flex-shrink-0 truncate">
        {name}
      </span>
      <div className="flex-1 h-1.5 bg-border/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${c.bar} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span
        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${c.badge}`}
      >
        {level}
      </span>
    </div>
  );
}
