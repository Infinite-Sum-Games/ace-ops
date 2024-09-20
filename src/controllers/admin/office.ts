import { prismaClient } from "@/main";
import { createToken } from "@/middleware/authentication/token";
import { AdminLoginRequest } from "@/types/login";
import { Request, Response } from "express";

export const AdminLoginHandler = async (req: Request, res: Response) => {
  const validBody = AdminLoginRequest.safeParse(req.body);

  if (validBody.success !== true) {
    return res.status(400).json({
      message: "Bad Request"
    });
  }

  try {
    const existingAdmin = await prismaClient.user.findFirst({
      where: {
        email: validBody.data.email,
        password: validBody.data.password,
      }
    });

    const accessToken = await createToken(validBody.data.email);

    if (existingAdmin) {
      return res.status(200).json({
        message: "Login Successful",
        adminFirstName: existingAdmin.firstName,
        adminLastName: existingAdmin.lastName,
        adminEmail: existingAdmin.email,
        accessToken,
      });
    } else {
      return res.status(403).json({
        message: "Username or Password does not match!"
      });
    }
  } catch (e) {
    // TODO: Setup logger for all internal server errors
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}
