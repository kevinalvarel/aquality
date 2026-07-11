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
    title: "Interactive Map",
    description:
      "Geospatial visualization of all monitored beaches with water quality overlays, industrial zones, and environmental data layers.",
    color: "text-primary",
    bgColor: "bg-primary/8",
    borderColor: "group-hover:border-primary/20",
  },
  {
    icon: Droplets,
    title: "Water Quality Prediction",
    description:
      "AI-powered predictions for coastal water quality using machine learning models trained on environmental and industrial data.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
    borderColor: "group-hover:border-cyan-500/20",
  },
  {
    icon: Brain,
    title: "Beach Analysis",
    description:
      "Deep environmental analysis per beach — covering healthy water percentage, quality status, and ecosystem summary.",
    color: "text-sky-500",
    bgColor: "bg-sky-500/8",
    borderColor: "group-hover:border-sky-500/20",
  },
  {
    icon: Factory,
    title: "Industrial Impact Analysis",
    description:
      "Assess the impact of nearby industries on water quality, including distance, category, and pollution contribution.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
    borderColor: "group-hover:border-emerald-500/20",
  },
  {
    icon: BarChart3,
    title: "Historical Analysis",
    description:
      "Explore historical water quality trends, seasonal patterns, and long-term environmental changes across all beaches.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/8",
    borderColor: "group-hover:border-chart-2/20",
  },
  {
    icon: Trophy,
    title: "Quality Leaderboard",
    description:
      "Rank beaches by their water quality index score — helping users quickly identify the cleanest and safest coastal destinations.",
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
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
            Everything You Need for{" "}
            <span className="text-primary">Coastal Water Intelligence</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Aquality combines AI, machine learning, and environmental data to
            give you comprehensive insights into coastal water quality —
            from industrial impact to real-time predictions.
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

