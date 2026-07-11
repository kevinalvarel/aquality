import { Compass, FlaskConical, Landmark, Users } from "lucide-react";

const audiences = [
  {
    icon: Compass,
    title: "Visitors",
    description:
      "Understand beach water conditions before you go — make informed decisions about where to swim, fish, or relax.",
    color: "text-primary",
    bgColor: "bg-primary/8",
  },
  {
    icon: FlaskConical,
    title: "Researchers",
    description:
      "Access structured environmental insights, historical trends, and industrial impact data for coastal research.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/8",
  },
  {
    icon: Landmark,
    title: "Government",
    description:
      "Support evidence-based coastal management decisions with AI-driven water quality monitoring and analysis.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/8",
  },
  {
    icon: Users,
    title: "Communities",
    description:
      "Increase local awareness of coastal environmental quality and the impact of industrial activity on nearby beaches.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/8",
  },
];

export function WhyAquality() {
  return (
    <section id="why-aquality" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background lines */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">
            Who It&apos;s For
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-snug">
            Built for Everyone Who Cares About{" "}
            <span className="text-primary">Coastal Health</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re planning a beach visit or conducting research,
            Aquality provides the environmental insights you need.
          </p>
        </div>

        {/* Audience grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <div
                key={audience.title}
                className="group flex gap-5 rounded-2xl border border-border/40 bg-card/50 p-6 sm:p-7 transition-all duration-300 hover:bg-card hover:shadow-md"
              >
                <div
                  className={`flex-shrink-0 flex items-center justify-center size-12 rounded-xl ${audience.bgColor} ${audience.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="size-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
