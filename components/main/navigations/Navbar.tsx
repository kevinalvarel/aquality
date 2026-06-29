import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

const navList = [
  {
    label: "Jelajahi",
    href: "/explore",
  },
  {
    label: "Peta",
    href: "/map",
  },
  {
    label: "Analisis",
    href: "/analyze",
  },
  {
    label: "Peringkat",
    href: "/leaderboard",
  },
];

export function NavbarApp() {
  return (
    <div className="flex items-center justify-between py-4 px-6 md:px-12">
      <div className="flex items-center gap-2">
        <Image alt="Logo" src="/images/logo.png" height={50} width={50} />
        <h1 className="font-bold text-lg text-primary">Aquality</h1>
      </div>
      <div className="hidden md:flex items-center justify-center gap-10">
        {navList.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-muted-foreground hover:text-primary font-semibold"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="hidden md:flex items-center justify-center gap-4">
        <Avatar>
          <AvatarImage src="/images/logo.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex md:hidden"></div>
    </div>
  );
}
