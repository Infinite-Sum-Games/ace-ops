import { z } from "zod";

export type loginRequest = {
  email: string,
  password: string,
}

export type loginResponse = {
  accessKey: string,
  message: string,
}

export const AdminLoginRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
