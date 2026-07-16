import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBeachBySlugForWeather } from "@/services/weather.service";
import { WeatherAnalysisContent } from "./components/weather-analysis-content";

interface AnalisisHariIniPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AnalisisHariIniPageProps): Promise<Metadata> {
  const { slug } = await params;
  const beach = await getBeachBySlugForWeather(slug);

  if (!beach) {
    return { title: "Pantai Tidak Ditemukan — Aquality" };
  }

  return {
    title: `Analisis Cuaca Hari Ini — ${beach.pantai} | Aquality`,
    description: `Prakiraan cuaca dan rekomendasi aktivitas wisata pantai di ${beach.pantai}, ${beach.kecamatan}, ${beach.kabupatenKota}. Analisis real-time dari BMKG.`,
  };
}

export default async function AnalisisHariIniPage({
  params,
}: AnalisisHariIniPageProps) {
  const { slug } = await params;
  const beach = await getBeachBySlugForWeather(slug);

  if (!beach) {
    notFound();
  }

  return <WeatherAnalysisContent beach={beach} />;
}
