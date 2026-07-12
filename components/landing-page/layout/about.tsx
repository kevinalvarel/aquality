import GlowingCard from "@/components/glowing-card";
import { Brain, Activity, Factory } from "lucide-react";

const analysisTypes = [
  {
    icon: <Brain className="size-5" />,
    label: "ML Prediction",
    color: "text-primary",
    bgColor: "bg-primary/8",
    desc: "Machine learning models predict water quality status.",
  },
  {
    icon: <Activity className="size-5" />,
    label: "Water Quality",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
    desc: "Healthy water percentage and environmental indicators.",
  },
  {
    icon: <Factory className="size-5" />,
    label: "Industrial Impact",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
    desc: "Distance and category of nearby industrial sources.",
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
                About Aquality
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
                AI-Powered Coastal{" "}
                <span className="text-primary">Environmental Intelligence</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Aquality is an environmental monitoring platform that uses
                machine learning to analyze and predict coastal water quality
                across Banten&apos;s coastline. By evaluating environmental
                indicators and nearby industrial activity, Aquality helps
                visitors, researchers, and policymakers make data-driven
                decisions.
              </p>
            </div>

            {/* Detail items */}
            <div className="space-y-5">
              <AboutDetail
                number="01"
                title="Machine Learning Predictions"
                description="AI models trained on environmental data predict water quality status, giving you accurate assessments before you visit."
              />
              <AboutDetail
                number="02"
                title="Industrial Impact Assessment"
                description="Evaluate the proximity and category of industrial sources near each beach to understand their effect on water quality."
              />
              <AboutDetail
                number="03"
                title="18+ Monitored Beaches"
                description="From Anyer, Carita, Sawarna, to Tanjung Lesung — all beaches analyzed and ranked in a single platform."
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
                  Our Mission
                </p>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  &ldquo;Empowering communities and researchers with AI-driven
                  insights into coastal water quality — making environmental
                  data accessible to everyone.&rdquo;
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
                  Water Quality Index Today
                </p>
                <BeachScore
                  name="Pantai Anyer"
                  score={82}
                  level="Healthy"
                  color="emerald"
                />
                <BeachScore
                  name="Pantai Carita"
                  score={67}
                  level="Moderate"
                  color="amber"
                />
                <BeachScore
                  name="Pantai Sawarna"
                  score={91}
                  level="Excellent"
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
