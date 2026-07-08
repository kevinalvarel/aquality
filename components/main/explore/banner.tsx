import Image from "next/image";

export function Banner() {
  return (
    <>
      <div className="w-full relative rounded-xl">
        <Image
          src="/images/banner.jpeg"
          alt="Banner"
          width={1920}
          height={1080}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent " />
      </div>
    </>
  );
}
