import express from "express";
import { Request, Response } from "express";
import { User } from "../models/user.models";
import { z } from "zod";

export const usersRoutes = express.Router();

const createUserZodSchema = z.object({
  firstName: z.string().min(4).max(20),
  lastName: z.string().min(4).max(20),
  age: z.number().min(16).max(80),
  email: z.string(),
  password: z.string().min(6),
  role: z.string().optional().default("user"),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      zipCode: z.number().optional(),
    })
    .optional(),
  createdAt: z.date().optional().default(new Date()),
});

//create a user
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Check if user already exists by email
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    //built in instance method to hash password
    // const user = new User(body);
    // const password = await user.hashPassword(body.password);
    // user.password = password;

    // await user.save();

    //built in an custom static method to hash password
    // const password = await User.hashPassword(body.password);
    // console.log("Password hashed:", password);

    // body.password = password;
    const user = await User.create(body);

    //error handling for zod validation
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      error: error.errors ? error.errors : error.message,
    });
  }
});
//get all users
usersRoutes.get("/get-all-users", async (req: Request, res: Response) => {
  const users = await User.find().sort({"email": "asc"});

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No users found",
    });
  }
  res.status(200).json({
    success: true,
    message: "All users retrieved successfully",
    users,
  });
});
//update a user by id
usersRoutes.patch(
  "/update-user/:userId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedBody, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  }
);
//get a user by id
usersRoutes.get("/get-user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    user,
  });
});
//delete a user by id
usersRoutes.delete(
  "/delete-user/:userId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  }
);
