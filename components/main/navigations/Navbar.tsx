"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/servers/auth-action";
import { LogOut } from "lucide-react";
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
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between py-4 px-6 max-w-7xl mx-auto md:px-12">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/images/logo.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer"
                onSelect={() => signOutAction()}
              >
                <LogOut className="mr-2 size-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex md:hidden"></div>
      </div>
    </div>
  );
}
