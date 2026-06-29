import { NavbarApp } from "@/components/main/navigations/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarApp />
      <main className="max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
