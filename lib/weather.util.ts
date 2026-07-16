// ─── Weather Analysis Utilities ─────────────────────────────────────────────
// Pure functions that transform raw BMKG forecast data into tourism-focused
// insights for beach visitors. No side effects, no API calls.

import type {
  BMKGWeatherEntry,
  BMKGWeatherResponse,
  RecommendationStatus,
  RecommendationStatusInfo,
  RiskLevel,
  RiskInfo,
  ActivityRecommendation,
  WeatherInsight,
  TimelineDataPoint,
  BestVisitTimeInfo,
  ProcessedWeatherData,
} from "@/types/weather.type";

// ─── Constants ──────────────────────────────────────────────────────────────

const RECOMMENDATION_MAP: Record<RecommendationStatus, Omit<RecommendationStatusInfo, "status">> = {
  "sangat-direkomendasikan": {
    label: "Sangat Direkomendasikan",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/15",
    borderColor: "border-emerald-500/30",
    icon: "🟢",
  },
  direkomendasikan: {
    label: "Direkomendasikan",
    color: "text-sky-400",
    bgColor: "bg-sky-500/15",
    borderColor: "border-sky-500/30",
    icon: "🔵",
  },
  "perlu-waspada": {
    label: "Perlu Waspada",
    color: "text-amber-400",
    bgColor: "bg-amber-500/15",
    borderColor: "border-amber-500/30",
    icon: "🟡",
  },
  "tidak-direkomendasikan": {
    label: "Tidak Direkomendasikan",
    color: "text-rose-400",
    bgColor: "bg-rose-500/15",
    borderColor: "border-rose-500/30",
    icon: "🔴",
  },
};

// ─── Core Processing ────────────────────────────────────────────────────────

/**
 * Filter forecast entries to only include today's data based on local_datetime.
 */
export function filterTodayForecast(
  data: BMKGWeatherResponse,
): BMKGWeatherEntry[] {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const allEntries = data.data.flatMap((d) => d.cuaca.flat());

  // Filter entries whose local_datetime starts with today's date
  const todayEntries = allEntries.filter((entry) =>
    entry.local_datetime.startsWith(todayStr),
  );

  // If no entries for today (e.g., late at night), use the first available day
  if (todayEntries.length === 0) {
    const firstEntry = allEntries[0];
    if (!firstEntry) return [];
    const firstDate = firstEntry.local_datetime.substring(0, 10);
    return allEntries.filter((entry) =>
      entry.local_datetime.startsWith(firstDate),
    );
  }

  return todayEntries;
}

/**
 * Get the forecast entry closest to the current time.
 */
export function getCurrentWeather(
  entries: BMKGWeatherEntry[],
): BMKGWeatherEntry | null {
  if (entries.length === 0) return null;

  const now = new Date();
  let closest = entries[0];
  let minDiff = Math.abs(
    now.getTime() - new Date(entries[0].local_datetime.replace(" ", "T")).getTime(),
  );

  for (const entry of entries) {
    const entryTime = new Date(entry.local_datetime.replace(" ", "T")).getTime();
    const diff = Math.abs(now.getTime() - entryTime);
    if (diff < minDiff) {
      minDiff = diff;
      closest = entry;
    }
  }

  return closest;
}

/**
 * Calculate average temperature from forecast entries.
 */
export function calculateAverageTemp(entries: BMKGWeatherEntry[]): number {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, e) => acc + e.t, 0);
  return Math.round((sum / entries.length) * 10) / 10;
}

// ─── Recommendation Status ──────────────────────────────────────────────────

/**
 * Calculate overall beach visit recommendation based on composite weather score.
 * Weights: Rain 40%, Wind 30%, Cloud 20%, Temperature 10%
 */
export function getRecommendationStatus(
  entries: BMKGWeatherEntry[],
): RecommendationStatusInfo {
  if (entries.length === 0) {
    return { status: "perlu-waspada", ...RECOMMENDATION_MAP["perlu-waspada"] };
  }

  const avgRain = entries.reduce((a, e) => a + e.tp, 0) / entries.length;
  const avgWind = entries.reduce((a, e) => a + e.ws, 0) / entries.length;
  const avgCloud = entries.reduce((a, e) => a + e.tcc, 0) / entries.length;
  const avgTemp = calculateAverageTemp(entries);

  // Score each factor 0-100 (100 = best for beach)
  const rainScore = Math.max(0, 100 - avgRain * 50); // 0mm = 100, 2mm+ = 0
  const windScore = avgWind < 5 ? 100 : avgWind < 10 ? 80 : avgWind < 20 ? 50 : avgWind < 30 ? 20 : 0;
  const cloudScore = avgCloud < 30 ? 100 : avgCloud < 50 ? 75 : avgCloud < 80 ? 40 : 10;
  const tempScore = avgTemp >= 25 && avgTemp <= 32 ? 100 : avgTemp >= 22 && avgTemp <= 35 ? 70 : 30;

  const composite =
    rainScore * 0.4 + windScore * 0.3 + cloudScore * 0.2 + tempScore * 0.1;

  let status: RecommendationStatus;
  if (composite >= 75) status = "sangat-direkomendasikan";
  else if (composite >= 55) status = "direkomendasikan";
  else if (composite >= 35) status = "perlu-waspada";
  else status = "tidak-direkomendasikan";

  return { status, ...RECOMMENDATION_MAP[status] };
}

// ─── Risk Analysis ──────────────────────────────────────────────────────────

function getRiskLevel(value: number): RiskLevel {
  if (value <= 33) return "rendah";
  if (value <= 66) return "sedang";
  return "tinggi";
}

function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "rendah":
      return "text-emerald-400";
    case "sedang":
      return "text-amber-400";
    case "tinggi":
      return "text-rose-400";
  }
}

/**
 * Calculate risk levels for 4 categories: rain, wind, waves, thunder.
 */
export function calculateRiskLevels(entries: BMKGWeatherEntry[]): {
  rain: RiskInfo;
  wind: RiskInfo;
  wave: RiskInfo;
  thunder: RiskInfo;
} {
  if (entries.length === 0) {
    const defaultRisk: RiskInfo = {
      label: "Tidak ada data",
      level: "rendah",
      value: 0,
      description: "Data cuaca tidak tersedia",
      color: getRiskColor("rendah"),
    };
    return { rain: defaultRisk, wind: defaultRisk, wave: defaultRisk, thunder: defaultRisk };
  }

  const maxRain = Math.max(...entries.map((e) => e.tp));
  const avgRain = entries.reduce((a, e) => a + e.tp, 0) / entries.length;
  const maxWind = Math.max(...entries.map((e) => e.ws));
  const avgWind = entries.reduce((a, e) => a + e.ws, 0) / entries.length;
  const maxCloud = Math.max(...entries.map((e) => e.tcc));

  // Rain risk: based on max precipitation
  const rainValue = Math.min(100, maxRain * 30 + avgRain * 20);
  const rainLevel = getRiskLevel(rainValue);

  // Wind risk: based on max wind speed
  const windValue = Math.min(100, (maxWind / 40) * 100);
  const windLevel = getRiskLevel(windValue);

  // Wave risk: proxy from wind speed (coastal wind → waves)
  const waveValue = Math.min(100, (maxWind / 35) * 100);
  const waveLevel = getRiskLevel(waveValue);

  // Thunder risk: high cloud cover + precipitation = thunder potential
  const thunderValue = Math.min(100, (maxCloud / 100) * 50 + maxRain * 25);
  const thunderLevel = getRiskLevel(thunderValue);

  return {
    rain: {
      label: "Risiko Hujan",
      level: rainLevel,
      value: Math.round(rainValue),
      description:
        rainLevel === "rendah"
          ? "Curah hujan minim, langit cenderung cerah"
          : rainLevel === "sedang"
            ? "Ada potensi hujan ringan di beberapa waktu"
            : "Hujan deras sangat mungkin terjadi",
      color: getRiskColor(rainLevel),
    },
    wind: {
      label: "Risiko Angin Kencang",
      level: windLevel,
      value: Math.round(windValue),
      description:
        windLevel === "rendah"
          ? "Angin sepoi-sepoi, nyaman untuk aktivitas"
          : windLevel === "sedang"
            ? "Angin cukup kencang, hati-hati saat di air"
            : "Angin sangat kencang, hindari aktivitas air",
      color: getRiskColor(windLevel),
    },
    wave: {
      label: "Risiko Gelombang Tinggi",
      level: waveLevel,
      value: Math.round(waveValue),
      description:
        waveLevel === "rendah"
          ? "Gelombang tenang, aman untuk berenang"
          : waveLevel === "sedang"
            ? "Gelombang sedang, berhati-hati di laut"
            : "Gelombang tinggi, jangan masuk ke laut",
      color: getRiskColor(waveLevel),
    },
    thunder: {
      label: "Risiko Petir",
      level: thunderLevel,
      value: Math.round(thunderValue),
      description:
        thunderLevel === "rendah"
          ? "Potensi petir sangat kecil"
          : thunderLevel === "sedang"
            ? "Waspada petir di sore/malam hari"
            : "Risiko petir tinggi, segera cari perlindungan",
      color: getRiskColor(thunderLevel),
    },
  };
}

// ─── Activity Recommendations ───────────────────────────────────────────────

/**
 * Generate beach activity recommendations based on weather conditions.
 */
export function getActivityRecommendations(
  entries: BMKGWeatherEntry[],
): ActivityRecommendation[] {
  if (entries.length === 0) return [];

  const avgWind = entries.reduce((a, e) => a + e.ws, 0) / entries.length;
  const maxWind = Math.max(...entries.map((e) => e.ws));
  const avgRain = entries.reduce((a, e) => a + e.tp, 0) / entries.length;
  const maxRain = Math.max(...entries.map((e) => e.tp));
  const avgCloud = entries.reduce((a, e) => a + e.tcc, 0) / entries.length;

  const activities: ActivityRecommendation[] = [
    {
      name: "Bermain di tepi pantai",
      icon: "🏖️",
      status: avgRain < 1 && avgWind < 20 ? "safe" : avgRain < 3 ? "warning" : "danger",
      reason:
        avgRain < 1 && avgWind < 20
          ? "Kondisi cerah dan angin rendah, ideal untuk bermain pasir"
          : avgRain < 3
            ? "Ada potensi hujan ringan, siapkan payung"
            : "Hujan deras, tidak ideal untuk bermain",
    },
    {
      name: "Berenang",
      icon: "🏊",
      status: avgWind < 15 && maxRain < 1 ? "safe" : avgWind < 25 && maxRain < 2 ? "warning" : "danger",
      reason:
        avgWind < 15 && maxRain < 1
          ? "Gelombang tenang, aman untuk berenang di dekat pantai"
          : avgWind < 25
            ? "Hati-hati gelombang dan arus, berenang dekat pantai"
            : "Hindari berenang, gelombang dan arus kuat",
    },
    {
      name: "Fotografi landscape",
      icon: "📸",
      status: avgRain < 0.5 ? "safe" : avgRain < 2 ? "warning" : "danger",
      reason:
        avgRain < 0.5
          ? "Langit mendukung, pencahayaan bagus untuk foto"
          : avgRain < 2
            ? "Cahaya berawan, drama langit bisa menarik"
            : "Hujan lebat, lindungi peralatan kamera",
    },
    {
      name: "Piknik keluarga",
      icon: "🧺",
      status: avgRain < 0.5 && avgWind < 15 ? "safe" : avgRain < 2 && avgWind < 20 ? "warning" : "danger",
      reason:
        avgRain < 0.5 && avgWind < 15
          ? "Cuaca sempurna untuk piknik santai di pantai"
          : avgRain < 2
            ? "Siapkan tenda, ada potensi angin atau gerimis"
            : "Cuaca buruk, tunda piknik ke hari lain",
    },
    {
      name: "Snorkeling",
      icon: "🤿",
      status: avgWind < 10 && maxRain < 0.5 ? "safe" : avgWind < 20 && maxRain < 1 ? "warning" : "danger",
      reason:
        avgWind < 10 && maxRain < 0.5
          ? "Visibilitas air baik, ideal untuk snorkeling"
          : avgWind < 20
            ? "Visibilitas berkurang, tetap dekat pantai"
            : "Kondisi tidak aman untuk snorkeling",
    },
    {
      name: "Aktivitas perahu kecil",
      icon: "⛵",
      status: avgWind < 10 && maxWind < 15 ? "safe" : avgWind < 20 && maxWind < 25 ? "warning" : "danger",
      reason:
        avgWind < 10
          ? "Laut tenang, cocok untuk perahu kecil"
          : avgWind < 20
            ? "Angin cukup kencang, perlu pengalaman"
            : "Terlalu berbahaya untuk perahu kecil",
    },
    {
      name: "Surfing",
      icon: "🏄",
      status: avgWind >= 10 && avgWind <= 25 && maxRain < 2 ? "safe" : avgWind < 10 || avgWind > 30 ? "warning" : "danger",
      reason:
        avgWind >= 10 && avgWind <= 25
          ? "Angin dan ombak cukup untuk surfing"
          : avgWind < 10
            ? "Angin terlalu lemah, ombak kurang ideal"
            : "Angin terlalu kencang, berbahaya",
    },
    {
      name: "Jogging pantai",
      icon: "🏃",
      status: avgRain < 0.5 && avgCloud < 80 ? "safe" : avgRain < 2 ? "warning" : "danger",
      reason:
        avgRain < 0.5
          ? "Cuaca mendukung untuk olahraga di pantai"
          : avgRain < 2
            ? "Gerimis ringan, pasir mungkin becek"
            : "Hujan deras, terlalu licin untuk berlari",
    },
  ];

  return activities;
}

// ─── Best Visit Time ────────────────────────────────────────────────────────

/**
 * Find the best time window to visit the beach today.
 * Evaluates each forecast entry with a composite score.
 */
export function findBestVisitTime(
  entries: BMKGWeatherEntry[],
): BestVisitTimeInfo {
  if (entries.length === 0) {
    return {
      startTime: "--:--",
      endTime: "--:--",
      reason: "Data prakiraan tidak tersedia",
      score: 0,
    };
  }

  // Score each entry
  const scored = entries.map((entry) => {
    const rainPenalty = entry.tp * 30;
    const windPenalty = entry.ws > 20 ? (entry.ws - 20) * 3 : 0;
    const cloudPenalty = entry.tcc > 50 ? (entry.tcc - 50) * 0.3 : 0;
    const tempBonus = entry.t >= 25 && entry.t <= 32 ? 10 : 0;
    const humidityPenalty = entry.hu > 85 ? (entry.hu - 85) * 0.5 : 0;

    const score = Math.max(
      0,
      100 - rainPenalty - windPenalty - cloudPenalty - humidityPenalty + tempBonus,
    );

    return { entry, score };
  });

  // Find the best contiguous window
  let bestStart = 0;
  let bestScore = scored[0].score;

  for (let i = 0; i < scored.length; i++) {
    // Consider windows of 1-3 entries (3-9 hours)
    let windowScore = 0;
    let count = 0;
    for (let j = i; j < Math.min(i + 3, scored.length); j++) {
      windowScore += scored[j].score;
      count++;
    }
    const avgScore = windowScore / count;
    if (avgScore > bestScore) {
      bestScore = avgScore;
      bestStart = i;
    }
  }

  const bestEnd = Math.min(bestStart + 2, scored.length - 1);
  const startEntry = scored[bestStart].entry;
  const endEntry = scored[bestEnd].entry;

  const startTime = formatTimeLocal(startEntry.local_datetime);
  const endTimeHour = parseInt(formatTimeLocal(endEntry.local_datetime).split(":")[0]) + 3;
  const endTime = `${String(Math.min(endTimeHour, 23)).padStart(2, "0")}:00`;

  // Generate reason
  const avgTemp = Math.round(
    scored
      .slice(bestStart, bestEnd + 1)
      .reduce((a, s) => a + s.entry.t, 0) / (bestEnd - bestStart + 1),
  );
  const avgWind = Math.round(
    scored
      .slice(bestStart, bestEnd + 1)
      .reduce((a, s) => a + s.entry.ws, 0) / (bestEnd - bestStart + 1) * 10,
  ) / 10;
  const maxRain = Math.max(
    ...scored.slice(bestStart, bestEnd + 1).map((s) => s.entry.tp),
  );

  const reasons: string[] = [];
  if (maxRain < 0.5) reasons.push("cuaca cerah");
  else if (maxRain < 1) reasons.push("kemungkinan gerimis kecil");
  if (avgWind < 10) reasons.push("angin sepoi-sepoi");
  else if (avgWind < 20) reasons.push("angin rendah");
  if (maxRain < 1) reasons.push(`potensi hujan di bawah ${Math.round(maxRain * 100)}%`);
  reasons.push(`suhu sekitar ${avgTemp}°C`);

  return {
    startTime: startTime.replace(":", "."),
    endTime: endTime.replace(":", "."),
    reason: reasons.length > 0
      ? `${reasons[0].charAt(0).toUpperCase() + reasons[0].slice(1)}, ${reasons.slice(1).join(", ")}.`
      : "Kondisi cuaca terbaik dalam rentang waktu ini.",
    score: Math.round(bestScore),
  };
}

// ─── Weather Insights ───────────────────────────────────────────────────────

/**
 * Generate 4 key weather insights for beach tourists.
 */
export function generateWeatherInsights(
  entries: BMKGWeatherEntry[],
): WeatherInsight[] {
  if (entries.length === 0) return [];

  // 1. Hottest time
  const hottestEntry = entries.reduce((max, e) => (e.t > max.t ? e : max), entries[0]);
  const hottestTime = formatTimeLocal(hottestEntry.local_datetime);

  // 2. Highest rain risk time
  const rainiestEntry = entries.reduce(
    (max, e) => (e.tp > max.tp ? e : max),
    entries[0],
  );
  const rainiestTime = formatTimeLocal(rainiestEntry.local_datetime);

  // 3. Most comfortable period
  const comfortScores = entries.map((e) => ({
    entry: e,
    comfort:
      100 -
      Math.abs(e.t - 28) * 5 -
      (e.hu > 70 ? (e.hu - 70) * 0.8 : 0) -
      e.ws * 0.5 -
      e.tp * 20,
  }));
  const mostComfortable = comfortScores.reduce(
    (max, c) => (c.comfort > max.comfort ? c : max),
    comfortScores[0],
  );
  const comfortTime = formatTimeLocal(mostComfortable.entry.local_datetime);

  // 4. Biggest weather change
  let maxChange = 0;
  let changeFrom = entries[0];
  let changeTo = entries[0];
  for (let i = 1; i < entries.length; i++) {
    const tempDiff = Math.abs(entries[i].t - entries[i - 1].t);
    const windDiff = Math.abs(entries[i].ws - entries[i - 1].ws);
    const rainDiff = Math.abs(entries[i].tp - entries[i - 1].tp) * 10;
    const totalChange = tempDiff + windDiff + rainDiff;
    if (totalChange > maxChange) {
      maxChange = totalChange;
      changeFrom = entries[i - 1];
      changeTo = entries[i];
    }
  }

  return [
    {
      label: "Jam Terpanas",
      value: `${hottestTime} WIB`,
      description: `Suhu mencapai ${hottestEntry.t}°C dengan kelembapan ${hottestEntry.hu}%`,
      icon: "🌡️",
    },
    {
      label: "Risiko Hujan Tertinggi",
      value: rainiestEntry.tp > 0 ? `${rainiestTime} WIB` : "Minim hari ini",
      description:
        rainiestEntry.tp > 0
          ? `Curah hujan ${rainiestEntry.tp}mm, ${rainiestEntry.weather_desc}`
          : "Tidak ada prakiraan hujan signifikan hari ini",
      icon: "🌧️",
    },
    {
      label: "Periode Ternyaman",
      value: `${comfortTime} WIB`,
      description: `Suhu ${mostComfortable.entry.t}°C, kelembapan ${mostComfortable.entry.hu}%, angin ${mostComfortable.entry.ws} km/h`,
      icon: "😊",
    },
    {
      label: "Perubahan Cuaca Terbesar",
      value:
        maxChange > 0
          ? `${formatTimeLocal(changeFrom.local_datetime)} → ${formatTimeLocal(changeTo.local_datetime)}`
          : "Stabil sepanjang hari",
      description:
        maxChange > 0
          ? `Suhu ${changeFrom.t}°C → ${changeTo.t}°C, angin ${changeFrom.ws} → ${changeTo.ws} km/h`
          : "Kondisi cuaca relatif konsisten tanpa perubahan drastis",
      icon: "🔄",
    },
  ];
}

// ─── Narrative Generation ───────────────────────────────────────────────────

/**
 * Generate a human-readable weather narrative for the beach.
 */
export function generateWeatherNarrative(
  beachName: string,
  entries: BMKGWeatherEntry[],
): string {
  if (entries.length === 0) {
    return `Data prakiraan cuaca untuk ${beachName} belum tersedia saat ini.`;
  }

  const avgTemp = calculateAverageTemp(entries);
  const avgWind = Math.round(entries.reduce((a, e) => a + e.ws, 0) / entries.length * 10) / 10;
  const maxRain = Math.max(...entries.map((e) => e.tp));
  const avgCloud = Math.round(entries.reduce((a, e) => a + e.tcc, 0) / entries.length);

  // Determine dominant weather
  const weatherCounts = new Map<string, number>();
  for (const e of entries) {
    weatherCounts.set(e.weather_desc, (weatherCounts.get(e.weather_desc) || 0) + 1);
  }
  const dominantWeather = [...weatherCounts.entries()].reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    [...weatherCounts.entries()][0],
  )[0];

  // Build narrative
  const weatherPart = `Cuaca di ${beachName} hari ini cenderung ${dominantWeather.toLowerCase()}`;

  const windPart =
    avgWind < 5
      ? " dengan angin yang sangat tenang"
      : avgWind < 10
        ? " dengan kecepatan angin yang rendah"
        : avgWind < 20
          ? " dengan angin yang cukup bertiup"
          : " dengan angin yang cukup kencang";

  const tempPart = ` dan suhu rata-rata ${avgTemp}°C`;

  let conditionPart: string;
  if (maxRain < 0.5 && avgWind < 15) {
    conditionPart =
      ". Kondisi ini cukup ideal untuk aktivitas wisata pantai, bermain air, fotografi, dan menikmati pemandangan.";
  } else if (maxRain < 2 && avgWind < 25) {
    conditionPart =
      ". Kondisi masih cukup mendukung untuk wisata pantai, meski perlu mewaspadai perubahan cuaca di beberapa waktu.";
  } else {
    conditionPart =
      ". Kondisi cuaca kurang mendukung untuk aktivitas pantai secara umum. Pertimbangkan untuk menunda kunjungan.";
  }

  let riskPart: string;
  if (maxRain < 0.5 && avgCloud < 40) {
    riskPart =
      " Risiko gangguan cuaca relatif rendah sepanjang hari.";
  } else if (maxRain < 1) {
    riskPart =
      " Risiko gangguan cuaca relatif rendah hingga sore hari.";
  } else {
    riskPart =
      " Pantau perkembangan cuaca secara berkala untuk keamanan Anda.";
  }

  return weatherPart + windPart + tempPart + conditionPart + riskPart;
}

// ─── Timeline Data ──────────────────────────────────────────────────────────

/**
 * Transform forecast entries into chart-friendly data points.
 */
export function buildTimelineData(
  entries: BMKGWeatherEntry[],
): TimelineDataPoint[] {
  return entries.map((entry) => ({
    time: formatTimeLocal(entry.local_datetime),
    fullTime: entry.local_datetime,
    suhu: entry.t,
    kelembapan: entry.hu,
    curahHujan: Math.round(entry.tp * 100) / 100,
    weatherDesc: entry.weather_desc,
  }));
}

// ─── Master Processing Function ─────────────────────────────────────────────

/**
 * Process raw BMKG data into fully analyzed weather dashboard data.
 * This is the single entry point used by the React Query hook.
 */
export function processWeatherData(
  beachName: string,
  rawData: BMKGWeatherResponse,
): ProcessedWeatherData {
  const todayForecasts = filterTodayForecast(rawData);
  const currentWeather = getCurrentWeather(todayForecasts);

  return {
    currentWeather,
    todayForecasts,
    recommendationStatus: getRecommendationStatus(todayForecasts),
    averageTemp: calculateAverageTemp(todayForecasts),
    risks: calculateRiskLevels(todayForecasts),
    activities: getActivityRecommendations(todayForecasts),
    bestVisitTime: findBestVisitTime(todayForecasts),
    insights: generateWeatherInsights(todayForecasts),
    narrative: generateWeatherNarrative(beachName, todayForecasts),
    timelineData: buildTimelineData(todayForecasts),
    locationInfo: rawData.lokasi ?? null,
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Extract HH:MM from "YYYY-MM-DD HH:MM:SS" local_datetime string */
function formatTimeLocal(localDatetime: string): string {
  const timePart = localDatetime.split(" ")[1];
  if (!timePart) return "--:--";
  return timePart.substring(0, 5);
}

/** Get weather description in Indonesian */
export function getWeatherIcon(weatherCode: number): string {
  switch (weatherCode) {
    case 0:
      return "☀️";
    case 1:
      return "🌤️";
    case 2:
      return "⛅";
    case 3:
      return "☁️";
    case 4:
      return "🌫️";
    case 5:
      return "🌧️";
    case 10:
      return "🌫️";
    case 45:
      return "🌫️";
    case 60:
      return "🌧️";
    case 61:
      return "🌧️";
    case 63:
      return "🌧️";
    case 80:
      return "🌦️";
    case 95:
      return "⛈️";
    case 97:
      return "⛈️";
    default:
      return "🌤️";
  }
}
