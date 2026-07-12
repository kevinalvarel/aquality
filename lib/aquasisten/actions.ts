"use server";

import { SendMessageSchema } from "./types";
import type { AquasistenResponse } from "./types";

/**
 * Server action: send a message to the Aquasisten AI.
 *
 * This currently returns a simulated response. Replace the body
 * with a real fetch to your AI endpoint when ready.
 */
export async function sendMessageAction(
  rawPayload: unknown,
): Promise<AquasistenResponse> {
  // Validate with Zod
  const parsed = SendMessageSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  const { message } = parsed.data;

  try {
    // ── Replace with your real API call ────────────────────────
    // Example:
    // const res = await fetch(process.env.AQUASISTEN_API_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ prompt: message }),
    // });
    // const data = await res.json();
    // return { success: true, content: data.reply };

    // Simulated AI response for development
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const responses: Record<string, string> = {
      abrasi:
        "Berdasarkan data geospasial terbaru, **tingkat abrasi pantai** di wilayah pesisir utara menunjukkan peningkatan sebesar 2.3 meter/tahun. Area yang paling terdampak terletak di segmen pantai KM 12–15. Disarankan untuk melakukan penanaman mangrove sebagai mitigasi alami.",
      mangrove:
        "Hasil analisis kesehatan **ekosistem mangrove** menggunakan indeks NDVI menunjukkan bahwa 67% area mangrove dalam kondisi **baik**, 23% dalam kondisi **sedang**, dan 10% dalam kondisi **kritis**. Area kritis terkonsentrasi di muara sungai bagian timur.",
      kualitas:
        "Data pemantauan **kualitas air** dari 15 stasiun pengamatan menunjukkan nilai DO rata-rata 6.2 mg/L (standar: >5 mg/L), pH 7.4, dan TSS 45 mg/L. Secara umum, kualitas air masih dalam batas aman, namun ada peningkatan kadar fosfat di stasiun 7 dan 12.",
    };

    const key = Object.keys(responses).find((k) =>
      message.toLowerCase().includes(k),
    );

    const content =
      responses[key ?? ""] ??
      `Terima kasih atas pertanyaan Anda tentang *"${message.slice(0, 60)}${message.length > 60 ? "..." : ""}"*.\n\nSaat ini saya sedang memproses data lingkungan terkait. Berdasarkan database kami, berikut informasi yang relevan:\n\n1. **Data terakhir diperbarui**: ${new Date().toLocaleDateString("id-ID")}\n2. **Sumber data**: Sensor IoT & Citra Satelit\n3. **Cakupan wilayah**: Pesisir & Laut Teritorial\n\nUntuk informasi lebih detail, silakan spesifikasikan lokasi atau parameter lingkungan yang ingin Anda ketahui.`;

    return { success: true, content };
  } catch {
    return {
      success: false,
      error: "Gagal menghubungi server Aquasisten. Silakan coba lagi.",
    };
  }
}
