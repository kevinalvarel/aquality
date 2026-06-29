import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function ResultCard() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Image
              src="/images/logo.png"
              alt="Beach"
              width={300}
              height={300}
              className="rounded-md object-cover"
            />
            <CardTitle>Rekomendasi Destinasi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Berikut adalah rekomendasi destinasi berdasarkan preferensi Anda
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
