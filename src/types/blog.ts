import { z } from "zod";

export const UpdateBlogValidator = z.object({
  title: z.string().trim().min(3),
  blurb: z.string().trim().min(3).optional(),
  content: z.string().trim().min(3).optional(),
  author: z.string().trim().min(3).optional(),
  tags: z.array(z.string())
})

export const CreateBlogValidator = z.object({
  title: z.string().trim().min(3),
  blurb: z.string().trim().min(3),
  content: z.string().trim().min(3),
  author: z.string().trim().min(3),
  tags: z.array(z.string()).min(1),
  status: z.enum(["Draft", "Published"]).default("Draft").optional(),
})
