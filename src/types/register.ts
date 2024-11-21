import { z } from "zod";

const departments =[
  "Computer Science and Engineering",
  "Electrical and Electronics Engineering",
  "Electronics and Communication Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Automation and Robotics",
  "Physical Sciences",
]

export const CreateAdminValidator = z.object({
  facultyEmail: z.string().email(),
  facultyPassword: z.string().min(8),
  adminFirstName: z.string().min(3).regex(/^[a-zA-Z ]+$/),
  adminLastName: z.string().min(3).regex(/^[a-zA-Z ]+$/),
  department: z.enum(departments as [string, ...string[]]),
  adminEmail: z.string().email(),
});
