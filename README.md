# 🌊 Aquality — Platform Monitoring & Analisis Kualitas Air Pantai Banten

Aquality adalah platform web modern berbasis **Next.js 16** dan **Tailwind CSS v4** yang dirancang untuk memantau, menganalisis, dan memvisualisasikan kualitas lingkungan pantai di Provinsi Banten secara nyata (_real-time_).

Dengan mengombinasikan visualisasi peta interaktif (**Maplibre GL**), rendering grafis gelombang WebGL interaktif (**OGL Shaders**), serta dashboard analisis kualitas air bertenaga AI, Aquality membantu wisatawan, peneliti, dan pengambil kebijakan dalam menentukan kondisi kelayakan pantai sebelum berkunjung.

---

## 🚀 Fitur Utama

Aquality menawarkan serangkaian fitur interaktif premium:

1. **Dashboard Analisis Pantai (AI-Powered Beach Analysis)**
   - Analisis kualitas air dan kebersihan pantai berdasarkan citra/foto udara menggunakan klasifikasi AI.
   - Metrik lingkungan mencakup: _Water Clarity_ (Kejelasan Air), _Turbidity_ (Kekeruhan), _Floating Waste_ (Sampah Mengapung), _Algae Presence_ (Keberadaan Alga), dan _Shoreline Cleanliness_ (Kebersihan Garis Pantai).
   - Dilengkapi rekomendasi aksi berbasis AI, riwayat lini masa analisis, deteksi objek (seperti plastik, rumput laut), dan bagan tren analitik interaktif.

2. **Peta Interaktif Banten (Interactive Map)**
   - Visualisasi geospasial lokasi pantai di Provinsi Banten menggunakan **Maplibre GL** (diintegrasikan via `@mapcn`).
   - Pencarian cepat, penandaan marker (_Destination Marker_) dinamis, dan overlay informasi status pantai.

3. **Eksplorasi Destinasi & Rekomendasi (Explore Destinations)**
   - Halaman pencarian pantai berdasarkan preferensi pengunjung (aktivitas _surfing_, _snorkeling_, keheningan pantai, dsb.).
   - Dilengkapi _Filter Card_ interaktif untuk memudahkan pemilihan pantai berdasarkan jarak dari Jakarta, _rating_, durasi kunjungan, serta tag kategori.

4. **Desain Dinamis & Premium (Advanced Visual Effects)**
   - Efek latar belakang cairan/gelombang air interaktif yang dirender langsung di GPU menggunakan WebGL Shaders (komponen [Strands](file:///c:/Users/Administrator/Desktop/project/aquality/components/shaders/strands.tsx) berbasis pustaka OGL).
   - Skema warna elegan dengan dukungan mode gelap (_dark mode_) yang harmonis, _micro-animations_ halus (berbasis Framer Motion), dan tipografi premium menggunakan font _Plus Jakarta Sans_.

---

## 🛠️ Tech Stack & Dependensi

Proyek ini dibangun menggunakan arsitektur modern berkinerja tinggi:

| Kategori                | Teknologi/Pustaka                                                                                                                                                                              | Deskripsi / Peran                                         |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| **Inti & Rangka kerja** | [Next.js v16.2.9](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L17)                                                                                                    | Framework React dengan App Router                         |
| **Pustaka UI**          | [React v19.2.4](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L21)                                                                                                      | Pustaka JavaScript untuk membangun UI                     |
| **Styling**             | [Tailwind CSS v4](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L35) + [@tailwindcss/postcss](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L29) | Utility-first CSS framework versi terbaru                 |
| **Komponen UI**         | [Shadcn UI](file:///c:/Users/Administrator/Desktop/project/aquality/components.json) + [Radix UI](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L20)                    | Komponen UI modular, aksesibel, dan terkelola             |
| **Visualisasi Peta**    | [Maplibre GL v5.24.0](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L15)                                                                                                | Peta interaktif 3D berperforma tinggi                     |
| **WebGL & Shaders**     | [OGL v1.0.11](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L19)                                                                                                        | WebGL library minimalis untuk animasi gelombang _strands_ |
| **Animasi**             | [Motion v12.42.0](file:///c:/Users/Administrator/Desktop/project/aquality/package.json#L16)                                                                                                    | Pustaka animasi modern untuk transisi dan efek mikro      |
| **Ikon**                | `lucide-react` & `react-icons`                                                                                                                                                                 | Set ikon SVG untuk antarmuka pengguna                     |

---

## 📂 Struktur Direktori Proyek

```bash
aquality/
├── app/                              # Folder Rute Next.js (App Router)
│   ├── (auth)/                       # Rute Login & Register
│   │   ├── login/page.tsx            # Halaman Masuk Akun
│   │   └── register/page.tsx         # Halaman Daftar Akun
│   ├── (landing-page)/               # Rute Halaman Depan
│   │   ├── layout.tsx                # Layout dengan background shader & navbar melayang
│   │   └── page.tsx                  # Halaman Beranda Utama
│   ├── (main)/                       # Rute Aplikasi Utama (Dashboard)
│   │   ├── analyze/                  # Halaman Analisis AI
│   │   │   ├── page.tsx              # Dashboard Analisis Utama
│   │   │   └── pantai-kuta/page.tsx  # Laporan Detail Analisis Pantai (Mockup)
│   │   ├── explore/page.tsx          # Halaman Jelajahi & Filter Pantai
│   │   ├── map/page.tsx              # Halaman Peta Interaktif
│   │   └── layout.tsx                # Layout Dashboard Utama (Navbar Aplikasi)
│   ├── globals.css                   # Konfigurasi Tema & CSS Variables Tailwind v4
│   └── layout.tsx                    # Root Layout Proyek
├── components/                       # Komponen React Reusable
│   ├── landing-page/                 # Komponen Khusus Landing Page
│   │   ├── layout/                   # Hero, About, Features, Footer, How It Works
│   │   ├── ui/                       # Navbar melayang, Call to Action (CTA)
│   │   └── background.tsx            # Wrapper background shader strands
│   ├── main/                         # Komponen Aplikasi Utama
│   │   ├── analyze/                  # Komponen Dashboard Analisis & Detail Analisis
│   │   ├── explore/                  # Banner, Filter Card, Result Card
│   │   ├── map/                      # Marker & Item List pada Peta
│   │   └── navigations/              # Navbar Aplikasi
│   ├── providers/                    # Providers konteks React (Theme, dll.)
│   ├── shaders/                      # File Shader WebGL
│   │   └── strands.tsx               # Animasi gelombang cairan/wave shader menggunakan OGL
│   └── ui/                           # Komponen UI Dasar (Shadcn)
├── json/                             # Data Statis
│   └── destination.json              # Basis data pantai Banten terpantau
├── lib/                              # Utilitas Helper
│   └── utils.ts                      # Penggabungan kelas CSS (cn utility)
├── types/                            # Definisi Tipe TypeScript
├── components.json                   # Konfigurasi Shadcn UI & Registry kustom @mapcn
├── package.json                      # Konfigurasi dependensi dan skrip proyek
└── tsconfig.json                     # Konfigurasi TypeScript
```

---

## 🏖️ Destinasi Pantai Terpantau (Banten)

Data pantai utama diambil secara dinamis dari berkas [destination.json](file:///c:/Users/Administrator/Desktop/project/aquality/json/destination.json):

|  #  | Nama Pantai               | Jarak dari Jakarta | Rating | Durasi Kunjungan | Tag Populer                            |
| :-: | :------------------------ | :----------------- | :----: | :--------------: | :------------------------------------- |
|  1  | **Pantai Anyer**          | 130 km             | ⭐ 4.5 |     Seharian     | `Resort`, `Keluarga`, `Populer`        |
|  2  | **Pantai Carita**         | 140 km             | ⭐ 4.4 |     Seharian     | `Snorkeling`, `Krakatau`, `Watersport` |
|  3  | **Pantai Sawarna**        | 220 km             | ⭐ 4.8 |     1–2 hari     | `Surfing`, `Hidden Gem`, `Laguna`      |
|  4  | **Pantai Tanjung Lesung** | 170 km             | ⭐ 4.6 |     1–2 hari     | `Resort Mewah`, `Tenang`, `Premium`    |
|  5  | **Pantai Karang Bolong**  | 120 km             | ⭐ 4.3 |     2–3 jam      | `Karang Unik`, `Fotografi`, `Alam`     |
|  6  | **Pantai Pasauran**       | 135 km             | ⭐ 4.5 |     Seharian     | `Diving`, `Terumbu Karang`, `Jernih`   |
|  7  | **Pantai Cibeureum**      | 145 km             | ⭐ 4.2 |     2–4 jam      | `Sunset`, `Sepi`, `Terjangkau`         |
|  8  | **Pantai Bagedur**        | 200 km             | ⭐ 4.4 |     Seharian     | `Surfing`, `Alami`, `Ombak Besar`      |

---

## ⚙️ Cara Memulai & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan Aquality di komputer lokal Anda:

### 1. Prasyarat

Pastikan Anda telah menginstal **Node.js** (rekomendasi versi LTS terbaru) di sistem Anda.

### 2. Instalasi Dependensi

Jalankan perintah berikut di terminal proyek untuk menginstal semua modul yang diperlukan:

```bash
npm install
```

### 3. Menjalankan Server Pengembangan

Jalankan server lokal dalam mode pengembangan:

```bash
npm run dev
```

Buka browser Anda dan akses [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

### 4. Build untuk Produksi

Untuk melakukan kompilasi proyek sebelum dideploy ke lingkungan produksi:

```bash
npm run build
```

### 5. Menjalankan Versi Produksi

Jalankan proyek hasil build produksi secara lokal:

```bash
npm run start
```

### 6. Linting

Gunakan perintah berikut untuk memeriksa kesalahan kode (_lint error_):

```bash
npm run lint
```

---

## 🛠️ Lisensi

Proyek ini bersifat privat untuk pengembangan internal platform **Aquality**.
