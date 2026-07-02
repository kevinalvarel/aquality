"use client";
import { cn } from "@/lib/ui/utils";
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

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Ferrofluid from "@/components/shaders/ferrofluid";
import { LoginSchema } from "@/validations/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    setIsLoading(true);

    setIsLoading(false);
  }

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
                  <Link
                    href="/reset-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Lupa Password?
                  </Link>
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
            <Ferrofluid
              colors={["#4288c9", "#4288c9", "#4288c9"]}
              speed={0.5}
              scale={1.6}
              turbulence={1}
              fluidity={0.1}
              rimWidth={0.2}
              sharpness={2.5}
              shimmer={1.5}
              glow={2}
              flowDirection="down"
              opacity={1}
              mouseInteraction
              mouseStrength={1}
              mouseRadius={0.35}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
