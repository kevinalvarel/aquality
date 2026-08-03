# 🌊 Aquality — Platform Monitoring & Analisis Kualitas Air Pantai Banten

Aquality adalah platform web modern berbasis **Next.js 16** dan **Tailwind CSS v4** yang dirancang untuk memantau, menganalisis, dan memvisualisasikan kualitas lingkungan pantai di Provinsi Banten secara nyata (_real-time_).

Dengan mengombinasikan visualisasi peta interaktif (**Maplibre GL**), rendering grafis gelombang WebGL interaktif (**OGL Shaders**), asisten chatbot bertenaga AI (**Aquasisten**), serta dashboard analisis kualitas air bertenaga AI, Aquality membantu wisatawan, peneliti, dan pengambil kebijakan dalam menentukan kondisi kelayakan pantai sebelum berkunjung.

---

## 🚀 Fitur Utama

Aquality menawarkan serangkaian fitur interaktif premium:

1. **Dashboard Analisis Pantai & Detail Kualitas (Beach Analysis & Detail)**
   - Analisis kualitas air dan kebersihan pantai berdasarkan citra/foto udara menggunakan klasifikasi AI.
   - Metrik lingkungan mencakup: _Water Clarity_ (Kejelasan Air), _Turbidity_ (Kekeruhan), _Floating Waste_ (Sampah Mengapung), _Algae Presence_ (Keberadaan Alga), dan _Shoreline Cleanliness_ (Kebersihan Garis Pantai).
   - Menampilkan data jarak industri terdekat, kategori dampak industri, deteksi objek (seperti plastik, rumput laut), dan bagan tren analitik interaktif.

2. **Aquasisten — Asisten AI Lingkungan (AI-Powered Chat Assistant)**
   - Asisten virtual cerdas terintegrasi untuk menjawab pertanyaan seputar kondisi lingkungan pesisir, ancaman abrasi, kesehatan hutan mangrove, dan rekomendasi mitigasi kualitas air di Banten (menggunakan model Groq via Vercel AI SDK).

3. **Peta Interaktif Banten 3D (Interactive Map)**
   - Visualisasi geospasial lokasi pantai di Provinsi Banten menggunakan **Maplibre GL** (diintegrasikan via `@mapcn`).
   - Fitur pencarian cepat, penandaan marker (_Destination Marker_) dinamis, sidebar informasi status pantai, dan overlay status kelayakan pantai.

4. **Prakiraan Cuaca Hari Ini (BMKG Weather Forecast)**
   - Integrasi langsung dengan API BMKG untuk menyajikan prakiraan cuaca, kondisi angin, suhu, kelembaban, serta rekomendasi aktivitas harian bagi wisatawan di pantai tertentu.

5. **Peringkat Kualitas Pantai (Beach Leaderboard)**
   - Dashboard komparatif untuk melihat peringkat kebersihan pantai di Banten berdasarkan skor kesehatan lingkungan yang dihitung oleh AI, lengkap dengan visualisasi distribusi skor.

6. **Desain Dinamis & Premium (Advanced Visual Effects)**
   - Efek latar belakang cairan/gelombang air interaktif yang dirender langsung di GPU menggunakan WebGL Shaders (komponen [strands.tsx](file:///c:/Users/Administrator/Desktop/Project/aquality/components/shaders/strands.tsx), [ferrofluid.tsx](file:///c:/Users/Administrator/Desktop/Project/aquality/components/shaders/ferrofluid.tsx), dan [dot-field.tsx](file:///c:/Users/Administrator/Desktop/Project/aquality/components/shaders/dot-field.tsx) berbasis pustaka OGL).
   - Skema warna elegan dengan dukungan mode gelap (_dark mode_) yang harmonis, _micro-animations_ halus (berbasis Framer Motion / Motion v12), dan tipografi premium menggunakan font _Plus Jakarta Sans_.

---

## 🛠️ Tech Stack & Dependensi

Proyek ini dibangun menggunakan arsitektur modern berkinerja tinggi:

| Kategori                | Teknologi/Pustaka                                                                                                                                                                              | Deskripsi / Peran                                    |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| **Inti & Rangka kerja** | [Next.js v16.2.9](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L28)                                                                                                    | Framework React dengan App Router                    |
| **Pustaka UI**          | [React v19.2.4](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L32)                                                                                                      | Pustaka JavaScript untuk membangun UI                |
| **Styling**             | [Tailwind CSS v4](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L51) + [@tailwindcss/postcss](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L44) | Utility-first CSS framework versi terbaru            |
| **Komponen UI**         | [Shadcn UI](file:///c:/Users/Administrator/Desktop/Project/aquality/components.json) + [Radix UI](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L31)                    | Komponen UI modular, aksesibel, dan terkelola        |
| **Autentikasi**         | [Better Auth v1.6.23](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L20)                                                                                                | Sistem autentikasi modern & aman untuk Next.js       |
| **Database & ORM**      | [Drizzle ORM v0.45.2](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L24) + [Neon Serverless](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L15)  | Database PostgreSQL serverless dengan Drizzle ORM    |
| **Caching Layer**       | [Upstash Redis](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L17)                                                                                                      | Redis cache berkinerja tinggi untuk optimasi API     |
| **Visualisasi Peta**    | [Maplibre GL v5.24.0](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L26)                                                                                                | Peta interaktif 3D berperforma tinggi                |
| **WebGL & Shaders**     | [OGL v1.0.11](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L30)                                                                                                        | WebGL library minimalis untuk animasi gelombang      |
| **Animasi**             | [Motion v12.42.0](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L27)                                                                                                    | Pustaka animasi modern untuk transisi dan efek mikro |
| **Integrasi AI**        | [Vercel AI SDK (ai)](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L19) + [@ai-sdk/groq](file:///c:/Users/Administrator/Desktop/Project/aquality/package.json#L12)      | Kerangka kerja untuk integrasi AI LLM Groq           |

---

## 📂 Struktur Direktori Proyek

```bash
aquality/
├── app/                              # Rute Next.js (App Router)
│   ├── (auth)/                       # Rute Login & Register
│   │   ├── login/page.tsx            # Halaman Masuk Akun
│   │   ├── register/page.tsx         # Halaman Daftar Akun
│   │   └── layout.tsx                # Layout Autentikasi
│   ├── (landing-page)/               # Rute Halaman Depan
│   │   ├── layout.tsx                # Layout dengan background shader strands & navbar melayang
│   │   └── page.tsx                  # Halaman Beranda Utama
│   ├── (main)/                       # Rute Aplikasi Utama (Dashboard)
│   │   ├── aquasisten/               # Halaman Asisten AI (Chatbot Lingkungan)
│   │   │   └── page.tsx
│   │   ├── explore/                  # Halaman Jelajahi & Filter Pantai
│   │   │   ├── [slug]/               # Detail Pantai & Analisis AI
│   │   │   │   ├── analisa-hari-ini/ # Analisis Cuaca & Aktivitas Harian BMKG
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── explore-client.tsx
│   │   │   └── page.tsx
│   │   ├── leaderboard/              # Halaman Peringkat Kualitas Pantai
│   │   │   └── page.tsx
│   │   ├── map/                      # Halaman Peta Interaktif 3D (Maplibre GL)
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Layout Dashboard Utama (Navbar Aplikasi)
│   ├── api/                          # Route Handlers API Backend
│   │   ├── auth/                     # Endpoint Autentikasi Better Auth
│   │   ├── chat/                     # Endpoint Chatbot AI Aquasisten
│   │   ├── industries/               # Endpoint Analisis Industri Terdekat
│   │   └── weather/                  # Endpoint Prakiraan Cuaca BMKG
│   ├── globals.css                   # Konfigurasi Tema & CSS Variables Tailwind v4
│   └── layout.tsx                    # Root Layout Proyek
├── components/                       # Komponen React Reusable
│   ├── auth/                         # Komponen Form Login & Register
│   ├── landing-page/                 # Komponen Khusus Landing Page
│   │   ├── layout/                   # Hero, About, Features, Footer, How It Works
│   │   ├── ui/                       # Navbar melayang, Call to Action (CTA)
│   │   └── background.tsx            # Wrapper background shader
│   ├── layouts/                      # Layout penampung komponen UI
│   ├── main/                         # Komponen Utama Dashboard
│   │   ├── analisa-hari-ini/         # Visualisasi cuaca & data BMKG
│   │   ├── aquasisten/               # Antarmuka Chatbot AI
│   │   ├── explore/                  # Banner, Filter, Rekomendasi, Detail Pantai ([slug])
│   │   ├── leaderboard/              # Komponen visualisasi peringkat pantai
│   │   ├── map/                      # Marker peta, sidebar info, detail lokasi
│   │   └── navigations/              # Navbar & Sidebar Aplikasi
│   ├── providers/                    # Providers Konteks React (Theme, Query, Auth)
│   ├── shaders/                      # File Shader WebGL (dot-field, ferrofluid, strands)
│   │   ├── dot-field.tsx
│   │   ├── ferrofluid.tsx
│   │   └── strands.tsx
│   └── ui/                           # Komponen UI Dasar (Shadcn UI)
├── db/                               # Konfigurasi Database (Drizzle ORM)
│   ├── relations/                    # Definisi Hubungan Relasi Antar Tabel
│   ├── schema/                       # Skema Tabel Database (beaches, analyses, dll.)
│   ├── enums.ts                      # Definisi Enum Database
│   ├── index.ts                      # Koneksi Database Client
│   └── schema.ts                     # Definisi Tabel Utama
├── lib/                              # Utilitas & Helper Fungsi
│   ├── auth.ts                       # Konfigurasi Better Auth Server
│   ├── auth-client.ts                # Klien Better Auth
│   ├── beach-analysis.util.ts        # Helper utilitas untuk analisis pantai
│   ├── cache.ts                      # Manajemen Caching (Redis)
│   ├── redis.ts                      # Klien Upstash Redis
│   ├── utils.ts                      # Fungsi utilitas (cn helper)
│   └── weather.util.ts               # Helper parse data cuaca BMKG
├── services/                         # Logika Bisnis & Pengambilan Data (Service Layer)
│   ├── beach.service.ts              # Query data pantai & riwayat analisis
│   ├── explore.service.ts            # Query halaman jelajah & detail analisis
│   ├── leaderboard.service.ts        # Query leaderboard & peringkat kualitas
│   └── weather.service.ts            # Query cuaca & prakiraan harian
├── types/                            # Definisi Tipe Data TypeScript
├── validations/                      # Skema Validasi Form (Zod)
├── components.json                   # Konfigurasi Shadcn UI & Registry kustom @mapcn
├── drizzle.config.ts                 # Konfigurasi Drizzle ORM
├── package.json                      # Dependensi & skrip proyek
└── tsconfig.json                     # Konfigurasi compiler TypeScript
```

---

## 🏖️ Destinasi Pantai Terpantau (Banten)

Data pantai utama terhubung langsung secara dinamis dengan basis data PostgreSQL (diakses melalui `beaches.ts` schema). Platform ini memantau lebih dari 50 lokasi pantai di Provinsi Banten yang mencakup berbagai wilayah administratif:

| Nama Pantai               | Kabupaten / Kota | Slug                    | Fitur Unggulan / Karakteristik                                          |
| :------------------------ | :--------------- | :---------------------- | :---------------------------------------------------------------------- |
| **Pantai Sawarna**        | Lebak            | `pantai-sawarna`        | Ombak besar (`Surfing`), laguna batu karang, panorama alam              |
| **Pantai Anyer**          | Serang           | `pantai-anyer`          | Pusat resort wisata populer, watersport keluarga, dekat Jakarta         |
| **Pantai Carita**         | Pandeglang       | `pantai-carita`         | Akses snorkeling, pemandangan Gunung Krakatau, watersport               |
| **Pantai Tanjung Lesung** | Pandeglang       | `pantai-tanjung-lesung` | Kawasan Ekonomi Khusus (KEK) premium, perairan tenang, resort           |
| **Pantai Bagedur**        | Lebak            | `pantai-bagedur`        | Garis pantai landai berpasir cokelat, ombak selatan yang megah          |
| **Pantai Karang Bolong**  | Serang           | `pantai-karang-bolong`  | Formasi batuan karang berlubang unik, fotografi lanskap alam            |
| **Pantai Tanjung Pasir**  | Tangerang        | `pantai-tanjung-pasir`  | Pesisir utara Tangerang, dermaga penyeberangan ke Pulau Untung Jawa     |
| **Pantai Pulorida**       | Cilegon          | `pantai-pulorida`       | Dekat pelabuhan Merak, kawasan industri pesisir dengan pemantauan ketat |

---

## ⚙️ Cara Memulai & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan Aquality di komputer lokal Anda:

### 1. Prasyarat

Pastikan Anda telah menginstal **Node.js** (rekomendasi versi LTS terbaru, minimal v18/v20) di sistem Anda.

### 2. Konfigurasi Environment Variables

Salin file `.env.example` menjadi `.env` dan isi nilai variabel lingkungan yang diperlukan:

```bash
cp .env.example .env
```

Sesuaikan variabel seperti `DATABASE_URL` (koneksi PostgreSQL), `REDIS_ENDPOINT` & `REDIS_TOKEN` (caching Upstash), serta `GROQ_API_KEY` (AI asisten).

### 3. Instalasi Dependensi

Jalankan perintah berikut di terminal proyek untuk menginstal semua modul yang diperlukan:

```bash
npm install
```

### 4. Menjalankan Server Pengembangan

Jalankan server lokal dalam mode pengembangan:

```bash
npm run dev
```

Buka browser Anda dan akses [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

### 5. Kompilasi & Build Produksi

Untuk melakukan kompilasi proyek sebelum dideploy ke lingkungan produksi:

```bash
npm run build
```

### 6. Menjalankan Versi Produksi

Jalankan proyek hasil build produksi secara lokal:

```bash
npm run start
```

### 7. Linting Kode

Gunakan perintah berikut untuk memeriksa kesalahan penulisan kode (_lint error_):

```bash
npm run lint
```

---

## 🛠️ Lisensi

Proyek ini bersifat privat untuk pengembangan internal platform **Aquality**.
