import express  from 'express';
import { Request, Response } from 'express';
import { User } from '../models/user.models';


export const usersRoutes = express.Router();
//create a user
usersRoutes.post("/create-user", async (req: Request, res: Response) => {

    const body = req.body;
    // console.log("User created:", user);
    
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }
    
    const user = await User.create(body);

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User creation failed"
    });
  }

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user        
  });
});
//get all users
usersRoutes.get("/get-all-users", async (req: Request, res: Response) => {
  const users = await User.find();
    res.status(200).json({
        success: true,
        message: "All users retrieved successfully",
        users
    });
});
//update a user by id
usersRoutes.patch("/update-user/:userId", async (req: Request, res: Response) => {
  const userId  = req.params.userId;
  const updatedBody = req.body;
  const user = await User.findByIdAndUpdate(userId,updatedBody,{ new: true });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user
  });
});
//get a user by id
usersRoutes.get("/get-user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    user
  });
});
//delete a user by id
usersRoutes.delete("/delete-user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user
  });
});