import { NextRequest, NextResponse } from "next/server";

const WEATHER_API = process.env.WEATHER_FORECAST_API;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const adm4 = searchParams.get("adm4");

  if (!adm4) {
    return NextResponse.json(
      { error: "Parameter 'adm4' wajib diisi" },
      { status: 400 },
    );
  }

  if (!WEATHER_API) {
    return NextResponse.json(
      { error: "WEATHER_FORECAST_API tidak dikonfigurasi" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `${WEATHER_API}/prakiraan-cuaca?adm4=${encodeURIComponent(adm4)}`,
      { next: { revalidate: 1800 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Gagal mengambil data cuaca dari BMKG: ${res.statusText}` },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API proxy error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghubungi server cuaca" },
      { status: 502 },
    );
  }
}
