import { z } from "zod";

const departments =[
  "Aerospace Engineering",
  "Artificial Intelligence Engineering",
  "Artificial Intelligence and Data Science Engineering",
  "Automation and Robotics Engineering",
  "Computer and Communication Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science and Engineering",
  "Cyber Security Engineering",
  "Electrical and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Electrical and Computer Engineering",
  "Mechanical Engineering"
]

export const CreateAdminValidator = z.object({
  facultyEmail: z.string().email(),
  facultyPassword: z.string().min(8),
  adminFirstName: z.string().min(3).regex(/^[a-zA-Z ]+$/),
  adminLastName: z.string().min(3).regex(/^[a-zA-Z ]+$/),
  department: z.enum(departments as [string, ...string[]]),
  adminEmail: z.string().email(),
});
