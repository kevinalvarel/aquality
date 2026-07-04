import { db } from "../drizzle";
import { beaches } from "../db/schema/beaches";
import fs from "fs";
import path from "path";

async function seed() {
  console.log("Mulai seeding data pantai dari JSON...");

  const dataPath = path.join(process.cwd(), "json", "destination.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const parsedData = JSON.parse(rawData);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const inserts = parsedData.destinations.map((dest: any) => {
    // Menentukan status berdasarkan rating
    let status = "moderate";
    if (dest.rating >= 4.6) {
      status = "excellent";
    } else if (dest.rating >= 4.3) {
      status = "good";
    }

    return {
      slug: generateSlug(dest.name),
      name: dest.name,
      location: dest.distance, // Menggunakan distance sebagai deskripsi lokasi singkat
      province: "Banten", // Berdasarkan data di JSON semuanya berada di Banten
      description: dest.description,
      latitude: dest.latitude,
      longitude: dest.longitude,
      status: status as any, // "excellent" | "good" | "moderate" | "poor"
    };
  });

  try {
    await db.insert(beaches).values(inserts).onConflictDoNothing({ target: beaches.slug });
    console.log(`Berhasil melakukan seeding untuk ${inserts.length} data pantai.`);
  } catch (error) {
    console.error("Gagal melakukan seeding:", error);
  }
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0));
