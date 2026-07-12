import { NavbarApp } from "@/components/main/navigations/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
      <NavbarApp />
      <main className=" max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
