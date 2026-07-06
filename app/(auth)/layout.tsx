import { FloatingNavbar } from "@/components/landing-page/ui/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FloatingNavbar />
      <div>{children}</div>
    </>
  );
}
