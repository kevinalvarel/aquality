"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import { signOutAction } from "@/servers/auth-action";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border rounded-bl-lg rounded-br-lg">
      <div className="flex items-center justify-between py-4 px-6 max-w-7xl mx-auto md:px-12">
        <div className="flex items-center gap-2">
          <Image alt="Logo" src="/images/logo.png" height={50} width={50} />
          <h1 className="font-bold text-lg text-primary">Aquality</h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-10">
          {navList.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors font-semibold ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Profile Actions */}
        <div className="hidden md:flex items-center justify-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
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

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer size-8">
                  <AvatarFallback className="text-xs">
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
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
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 p-0">
                <Menu className="size-5" />
                <span className="sr-only">Menu Utama</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between p-6">
              <div className="space-y-6">
                <SheetHeader className="p-0 flex flex-row items-center gap-2">
                  <Image alt="Logo" src="/images/logo.png" height={40} width={40} />
                  <SheetTitle className="font-bold text-lg text-primary">Aquality</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {navList.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`text-sm font-medium py-2.5 px-3.5 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {session && (
                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <Avatar className="size-9">
                      <AvatarFallback>
                        {session?.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 justify-center"
                    onClick={() => signOutAction()}
                  >
                    <LogOut className="size-4" />
                    Keluar
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
