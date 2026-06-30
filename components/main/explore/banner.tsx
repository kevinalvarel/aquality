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
          className="w-full h-96 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent " />
      </div>
    </>
  );
}
