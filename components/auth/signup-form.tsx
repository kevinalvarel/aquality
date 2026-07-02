"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import Ferrofluid from "@/components/shaders/ferrofluid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/servers/auth-action";
import { toast } from "sonner";
import { Eye, Loader2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { RegisterSchema } from "@/validations/auth";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  async function onSubmit(values: RegisterSchema) {
    setIsLoading(true);
    const { success, message } = await signUp(
      values.username,
      values.email,
      values.password,
    );
    if (success) {
      toast.success(message);
      router.push("/login");
      router.refresh();
    } else {
      toast.error(message);
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Buat Akun Aquality</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Daftarkan email kamu untuk memulai menggunakan Aquality
                </p>
              </div>
              <Controller
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="username">Nama Pengguna</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      type="text"
                      placeholder="John Doe"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <FieldDescription>
                      Email ini akan kami gunakan untuk menghubungi Anda.
                    </FieldDescription>
                  </Field>
                )}
              />
              <FieldGroup className="grid grid-cols-2">
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="password"
                          type={isShowPassword ? "text" : "password"}
                          placeholder="Password"
                        />
                        <InputGroupAddon
                          align="inline-end"
                          className="cursor-pointer"
                        >
                          <Eye onClick={toggleShowPassword} />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>
                        Masukkan password kamu
                      </FieldDescription>
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="confirmPassword">
                        Konfirmasi Password
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="confirmPassword"
                          type={isShowPassword ? "text" : "password"}
                          placeholder="Password"
                        />
                        <InputGroupAddon
                          align="inline-end"
                          className="cursor-pointer"
                        >
                          <Eye onClick={toggleShowPassword} />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <FieldDescription>
                        Konfirmasi password kamu
                      </FieldDescription>
                    </Field>
                  )}
                />
              </FieldGroup>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Buat Akun"
                  )}
                </Button>
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
