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
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";

export function LoginForm({
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
                <h1 className="text-2xl font-bold">Selamat Datang Kembali</h1>
                <p className="text-balance text-muted-foreground">
                  Masuk ke akun Aquality kamu untuk melanjutkan
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Lupa Password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Masuk</Button>
              </Field>
              <FieldSeparator className="h-1 my-3 *:data-[slot=field-separator-content]:bg-card">
                Atau lanjutkan dengan
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  <FaGoogle />
                  <span className="sr-only">Masuk dengan Google</span>
                </Button>
                <Button variant="outline" type="button">
                  <FaGithub />
                  <span className="sr-only">Masuk dengan Github</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Belum punya akun? <Link href="/register">Daftar</Link>
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
