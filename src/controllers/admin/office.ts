import { prismaClient } from "@/main";
import { createToken } from "@/middleware/authentication/token";
import { AdminLoginRequest } from "@/types/login";
import { Request, Response } from "express";
import { CreateAdminValidator, UpdateAdminValidator } from "@/types/register";
import { RandomPassword } from "@/config/pwd_generator";
import { newHash } from "@/config/hash";

// Existing login handler
export const AdminLoginHandler = async (req: Request, res: Response) => {
  const validBody = AdminLoginRequest.safeParse(req.body);

  if (!validBody.success) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    const existingAdmin = await prismaClient.admin.findFirst({
      where: {
        email: validBody.data.email,
        password: validBody.data.password,
      },
    });

    if (!existingAdmin) {
      return res.status(403).json({ message: "Username or Password does not match!" });
    }

    const accessToken = await createToken(validBody.data.email);

    return res.status(200).json({
      message: "Login Successful",
      adminFirstName: existingAdmin.firstName,
      adminLastName: existingAdmin.lastName,
      adminEmail: existingAdmin.email,
      accessToken,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error! Please try again later." });
  }
};

// Handler to get all active admins
export const GetAllAdminHandler = async (_req: Request, res: Response) => {
  try {
    const currentAdmins = await prismaClient.admin.findMany({
      where: { isActive: true },
      select: {
        firstName: true,
        lastName: true,
        department: true,
        email: true,
        role: true,
      },
    });

    if (!currentAdmins || currentAdmins.length === 0) {
      return res.status(404).json({ message: "No admin found" });
    }

    return res.status(200).json({
      message: "Admin details fetched successfully",
      admins: currentAdmins,
    });
  } catch (e) {
    return res.status(500).json({ message: "Failed to retrieve admin details" });
  }
};

// Handler to create a new admin
export const CreateAdminHandler = async (req: Request, res: Response) => {
  const details = CreateAdminValidator.safeParse(req.body);

  if (!details.success) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const { facultyEmail, facultyPassword, adminFirstName, adminLastName, department, adminEmail } = details.data;

  try {
    const newAdmin = await prismaClient.$transaction(async (trx) => {
      const existingFaculty = await trx.admin.findFirst({
        where: {
          email: facultyEmail,
          password: facultyPassword,
          role: "Faculty",
        },
      });

      if (!existingFaculty) {
        throw new Error("FacultyNotFound");
      }

      const password = RandomPassword();
      const doubleHashedPassword = newHash(newHash(password));

      const createdAdmin = await trx.admin.create({
        data: {
          firstName: adminFirstName,
          lastName: adminLastName,
          department,
          email: adminEmail,
          isActive: true,
          password: doubleHashedPassword,
        },
      });

      // Optional: add a mailer later
      // sendAdminPassword(createdAdmin.firstName, createdAdmin.email, password);

      return createdAdmin;
    });

    return res.status(201).json({
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (e) {
    if (e instanceof Error && e.message === "FacultyNotFound") {
      return res.status(404).json({ message: "Faculty not found" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Handler to update admin details
export const UpdateAdminHandler = async (req: Request, res: Response) => {
  const result = UpdateAdminValidator.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Bad Request",
      issues: result.error.issues,
    });
  }

  const { email, firstName, lastName, department } = result.data;

  try {
    const existingAdmin = await prismaClient.admin.findUnique({
      where: { email },
    });

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (existingAdmin.role === "Faculty") {
      return res.status(403).json({
        message: "Faculty admins are not allowed to update other admins",
      });
    }

    const updatedAdmin = await prismaClient.admin.update({
      where: { email },
      data: {
        firstName,
        lastName,
        department,
      },
    });

    return res.status(200).json({
      message: "Admin updated successfully",
      firstName: updatedAdmin.firstName,
      lastName: updatedAdmin.lastName,
      department: updatedAdmin.department,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
