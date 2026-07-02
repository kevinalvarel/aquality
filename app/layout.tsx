// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Noto_Serif_Georgian,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { PageBackground } from "@/components/background";
import { Providers } from "@/components/providers/providers";
import { FloatingNavbar } from "@/components/landing-page/ui/navbar";

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

export const metadata: Metadata = {
  title: "Aquality",
  description: "AI-powered app to track water quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
