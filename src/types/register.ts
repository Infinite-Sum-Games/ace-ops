import { z } from "zod";

export const CreateAdminValidator = z.object({
  facultyEmail: z.string().email(),
  adminFirstName: z.string().min(3).regex(/^[a-zA-Z ]+$/),
  adminLastName: z.string().min(3).regex(/^[a-zA-Z ]+$/),
  department: z.string().min(3).regex(/^[a-zA-Z ]+$/),
  adminEmail: z.string().email(),
});
