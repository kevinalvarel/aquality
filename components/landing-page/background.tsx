import Strands from "@/components/shaders/strands";

export function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50 md:opacity-100 ">
        <Strands
          colors={["#166534", "#4288c9", "#ffffff"]}
          count={3}
          speed={0.5}
          amplitude={1}
          waviness={1}
          thickness={0.7}
          glow={2.6}
          taper={3}
          spread={1}
          intensity={0.6}
          saturation={2}
          opacity={0.2}
          scale={3}
          glass={false}
          refraction={1}
          dispersion={1}
          glassSize={1}
          hueShift={0}
        />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
