export interface AnalyzeApiResponse {
  pantai: string;
  slug: string;
  Kecamatan: string;
  Kabupaten_Kota: string;
  latitude: number;
  longitude: number;
  url_gambar: string;

  // ─── Area Data 2026 ──────────────────────────────────────────────────────
  Luas_Air_2026_Ha: number;
  Sehat_2026_Ha: number;
  Sedang_2026_Ha: number;
  TidakSehat_2026_Ha: number;
  Pct_Sehat_2026: number;
  Pct_Sedang_2026: number;
  Pct_TidakSehat_2026: number;

  // ─── Satellite Metrics 2026 ──────────────────────────────────────────────
  Mean_NDTI_2026: number;
  Mean_NDCI_2026: number;
  Mean_TSS_2026: number;
  Mean_CDOM_2026: number;
  Status_Kualitas_2026: string;

  // ─── Industry Data ───────────────────────────────────────────────────────
  industri_terdekat: string;
  tipe_industri: string;
  jarak_industri_km: number;
  kategori_dampak_industri: string;
  industri_terdekat_2: string;
  tipe_industri_2: string;
  jarak_industri_2_km: number;
  industri_terdekat_3: string;
  tipe_industri_3: string;
  jarak_industri_3_km: number;

  industri_relevan_terdekat: string;
  tipe_industri_relevan: string;
  jarak_industri_relevan_km: number;
  relevansi_industri: number;
  jumlah_industri_radius_10km: number;
  kepadatan_industri: number;
  total_relevansi_radius: number;
  daftar_industri_radius: string[];
  indeks_dampak_industri: number;

  // ─── Urban & Population ──────────────────────────────────────────────────
  kepadatan_penduduk_kecamatan: number;
  indeks_pengaruh_urban: number;

  // ─── Historical Data 2017 ────────────────────────────────────────────────
  Luas_Air_2017_Ha: number;
  Sehat_2017_Ha: number;
  Pct_Sehat_2017: number;
  Mean_NDTI_2017: number;
  Mean_NDCI_2017: number;
  Status_Kualitas_2017: string;

  // ─── Trends & Narrative ──────────────────────────────────────────────────
  Delta_Pct_Sehat: number;
  Tren_Kualitas: string;
  penjelasan_kualitas: string;

  // ─── GeoJSON ─────────────────────────────────────────────────────────────
  geojson: unknown | null;
}
