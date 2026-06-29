import Image from "next/image";

export function Banner() {
  return (
    <div className="w-full">
      <Image
        src="/images/banner.jpg"
        alt="Banner"
        width={1920}
        height={1080}
        className="w-full h-96 object-cover"
      />
    </div>
  );
}
