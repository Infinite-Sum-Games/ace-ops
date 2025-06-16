import { prismaClient } from "@/main"
import { Request, Response } from "express";
import { z } from "zod";

export const GetAllBlogsHandlerForUser = async (_: Request, res: Response) => {
  try {
    const blogs = await prismaClient.blogs.findMany({
      select: {
        id: true,
        title: true,
        displayURL: true,
        blurb: true,
        author: true,
        tags: true,
        publishedOn: true
      },
      where: {
        status: "Published",
      }
    });
    return res.status(200).json({
      message: "All blogs retrieved and sent successfully.",
      data: blogs
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}

export const GetBlogByIdHandler = async (req: Request, res: Response) => {
  const blogId = z.string().cuid().safeParse(req.params.blogId)
  if (!blogId.success) {
    return res.status(400).json({
      message: "Invalid Blog Id provided."
    });
  }

  try {
    const blog = await prismaClient.blogs.findFirst({
      where: {
        id: blogId.data,
        status: "Published"
      },
      select: {
        id: true,
        title: true,
        displayURL: true,
        blurb: true,
        content: true,
        author: true,
        tags: true,
        publishedOn: true
      }
    })

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found."
      })
    }

    return res.status(200).json({
      message: "Blog retrieved successfully.",
      data: blog
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}



