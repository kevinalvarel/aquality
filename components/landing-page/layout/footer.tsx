import { Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { label: "Explore Beaches", href: "/explore" },
      { label: "Interactive Map", href: "/map" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Beach Analysis", href: "/analyze" },
    ],
  },
};

export function Footer() {
  return (
    <footer id="footer" className="relative w-full pt-16 pb-10">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="space-y-4 col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15 ">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">
                Aquality
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Aquality is an AI-powered coastal water quality analysis platform
              — predicting beach conditions using machine learning and
              environmental data.
            </p>
          </div>

          {/* Links columns */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
