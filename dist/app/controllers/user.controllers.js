"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_models_1 = require("../models/user.models");
// import { z } from "zod";
exports.usersRoutes = express_1.default.Router();
// const createUserZodSchema = z.object({
//   firstName: z.string().min(4).max(20),
//   lastName: z.string().min(4).max(20),
//   age: z.number().min(16).max(80),
//   email: z.string(),
//   password: z.string().min(6),
//   role: z.string().optional().default("user"),
//   address: z
//     .object({
//       street: z.string().optional(),
//       city: z.string().optional(),
//       zipCode: z.number().optional(),
//     })
//     .optional(),
//   createdAt: z.date().optional().default(new Date()),
// });
//create a user
exports.usersRoutes.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Check if user already exists by email
        const existingUser = yield user_models_1.User.findOne({ email: body.email });
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
        const user = yield user_models_1.User.create(body);
        //error handling for zod validation
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: `Invalid input data ${error}`,
            // error: error.errors ? error.errors : error.message,
        });
    }
}));
//get all users
exports.usersRoutes.get("/get-all-users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_models_1.User.find().sort({ "email": "asc" });
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
}));
//update a user by id
exports.usersRoutes.patch("/update-user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = yield user_models_1.User.findByIdAndUpdate(userId, updatedBody, {
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
}));
//get a user by id
exports.usersRoutes.get("/get-user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_models_1.User.findById(userId);
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
}));
//delete a user by id
exports.usersRoutes.delete("/delete-user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_models_1.User.findByIdAndDelete({ _id: userId });
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
}));
