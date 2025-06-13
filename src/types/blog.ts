import { z } from "zod";

export const UpdateBlogValidator = z.object({
  title: z.string().trim().min(3).regex(/^[a-zA-Z0-9_ ]+$/),
  blurb: z.string().trim().min(3).regex(/^[a-zA-Z0-9_ ]+$/).optional(),
  content: z.string().trim().min(3).regex(/^[a-zA-Z0-9_ ]+$/).optional(),
  author: z.string().trim().min(3).regex(/^[a-zA-Z0-9_ ]+$/).optional(),
  tags: z.array(z.string())
})
