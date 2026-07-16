// ─── Weather Types ──────────────────────────────────────────────────────────
// Type definitions for BMKG weather forecast data and processed analysis.

/** Raw BMKG API response structure */
export interface BMKGWeatherResponse {
  lokasi: BMKGLokasi;
  data: BMKGWeatherData[];
}

export interface BMKGLokasi {
  adm1: string;
  adm2: string;
  adm3: string;
  adm4: string;
  provinsi: string;
  kotkab: string;
  kecamatan: string;
  desa: string;
  lon: number;
  lat: number;
  timezone: string;
}

export interface BMKGWeatherData {
  lokasi: BMKGLokasiDetail;
  cuaca: BMKGWeatherEntry[][];
}

export interface BMKGLokasiDetail extends BMKGLokasi {
  type: string;
}

/** Individual BMKG forecast entry (per 3-hour interval) */
export interface BMKGWeatherEntry {
  datetime: string;
  t: number; // temperature (°C)
  tcc: number; // total cloud cover (%)
  tp: number; // total precipitation (mm)
  weather: number; // weather code
  weather_desc: string; // weather description (ID)
  weather_desc_en: string; // weather description (EN)
  wd_deg: number; // wind direction (degrees)
  wd: string; // wind direction label
  wd_to: string; // wind blowing towards
  ws: number; // wind speed (km/h)
  hu: number; // humidity (%)
  vs: number; // visibility (m)
  vs_text: string; // visibility text
  time_index: string;
  analysis_date: string;
  image: string; // weather icon URL
  utc_datetime: string;
  local_datetime: string;
}

/** Recommendation status for beach visit */
export type RecommendationStatus =
  | "sangat-direkomendasikan"
  | "direkomendasikan"
  | "perlu-waspada"
  | "tidak-direkomendasikan";

export interface RecommendationStatusInfo {
  status: RecommendationStatus;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

/** Risk levels for weather-related hazards */
export type RiskLevel = "rendah" | "sedang" | "tinggi";

export interface RiskInfo {
  label: string;
  level: RiskLevel;
  value: number; // 0-100 for progress bar
  description: string;
  color: string;
}

/** Activity recommendation based on weather conditions */
export interface ActivityRecommendation {
  name: string;
  status: "safe" | "warning" | "danger";
  reason: string;
  icon: string;
}

/** Weather insight data point */
export interface WeatherInsight {
  label: string;
  value: string;
  description: string;
  icon: string;
}

/** Timeline chart data point */
export interface TimelineDataPoint {
  time: string;
  fullTime: string;
  suhu: number;
  kelembapan: number;
  curahHujan: number;
  weatherDesc: string;
}

/** Best visit time window */
export interface BestVisitTimeInfo {
  startTime: string;
  endTime: string;
  reason: string;
  score: number;
}

/** Fully processed weather data from utility functions */
export interface ProcessedWeatherData {
  currentWeather: BMKGWeatherEntry | null;
  todayForecasts: BMKGWeatherEntry[];
  recommendationStatus: RecommendationStatusInfo;
  averageTemp: number;
  risks: {
    rain: RiskInfo;
    wind: RiskInfo;
    wave: RiskInfo;
    thunder: RiskInfo;
  };
  activities: ActivityRecommendation[];
  bestVisitTime: BestVisitTimeInfo;
  insights: WeatherInsight[];
  narrative: string;
  timelineData: TimelineDataPoint[];
  locationInfo: BMKGLokasi | null;
}

/** Beach data subset needed for weather page */
export interface BeachWeatherInfo {
  id: string;
  slug: string;
  pantai: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string | null;
  kodeAdm4: string | null;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
  description: string | null;
}
