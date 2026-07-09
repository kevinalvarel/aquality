export interface BeachApiResponse {
  pantai: string;
  slug: string;
  kecamatan: string;
  kabupaten_kota: string;
  latitude: number;
  longitude: number;
  url_gambar: string;
  health_score: number;
  label_rekomendasi: string;
  industri_terdekat: string;
  jarak_industri_km: number;
  kategori_dampak_industri: string;
  indeks_dampak_industri: number;
  industri_relevan_terdekat: string;
  jarak_industri_relevan_km: number;
  jumlah_industri_radius_10km: number;
  kepadatan_industri: number;
  kepadatan_penduduk_kecamatan: number;
  indeks_pengaruh_urban: number;
  pct_sehat_2026: number;
  status_kualitas_2026: string;
  mean_ndti_2026: number;
  mean_ndci_2026: number;
  mean_tss_2026: number;
  mean_cdom_2026: number;
  tren_kualitas: string;
  skor_detail: {
    skor_industri: number;
    skor_kepadatan_penduduk: number;
    skor_pengaruh_urban: number;
  };
  ranking: number;
  narasi_rekomendasi: string;
}
