import { PageBackground } from "@/components/landing-page/background";
import { FloatingNavbar } from "@/components/landing-page/ui/navbar";
import {
  IBM_Plex_Mono,
  Noto_Serif_Georgian,
  Plus_Jakarta_Sans,
} from "next/font/google";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Noto_Serif_Georgian({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <FloatingNavbar />
        <PageBackground />
        {children}
      </body>
    </html>
  );
}
