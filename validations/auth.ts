import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .email("Masukkan format email dengan benar!")
    .min(1, "Email tidak boleh kosong"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(3, "Username terlalu pendek"),
    email: z.email("Masukkan format email dengan benar!"),
    password: z.string().min(8, "Password harus lebih dari 8 karakter"),
    confirmPassword: z
      .string()
      .min(1, "Konfirmasi password tidak boleh kosong"),
  })
  .refine((data) => {
    const { password, confirmPassword } = data;
    return password === confirmPassword;
  }, "Passwords tidak cocok");

export type LoginSchema = z.infer<typeof LoginSchema>;
export type RegisterSchema = z.infer<typeof RegisterSchema>;
