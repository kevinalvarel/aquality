import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Buat Akun Aquality</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Daftarkan email kamu untuk memulai menggunakan Aquality
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Nama Pengguna</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                <FieldDescription>
                  Nama pengguna ini akan digunakan untuk login ke akun Aquality.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <FieldDescription>
                  Email ini akan kami gunakan untuk menghubungi Anda.
                </FieldDescription>
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Konfrimasi Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Harus minimal 8 karakter panjangnya.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Buat Akun</Button>
              </Field>
              <FieldSeparator className="h-1 my-3 *:data-[slot=field-separator-content]:bg-card">
                Atau lanjutkan dengan
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  <FaGoogle />
                  <span className="sr-only">Daftar dengan Google</span>
                </Button>
                <Button variant="outline" type="button">
                  <FaGithub />
                  <span className="sr-only">Daftar dengan Github</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Sudah punya akun? <Link href="/login">Masuk</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
