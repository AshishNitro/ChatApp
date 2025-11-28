import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be no more than 20 characters long" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
        .trim(), // Removes leading/trailing whitespace

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(100) // limit max length to prevent hashing DoS attacks
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),

    name: z
        .string()
        .min(1, { message: "Name is required" })
        .max(50, { message: "Name cannot exceed 50 characters" })
        .trim()
});

export const SigninSchema = z.object({
    username: z
        .string()
        .min(3)
        .max(20)
        .trim(),
        
    password: z
        .string()
        .min(1, { message: "Password is required" })
        
});

export const CreateRoomSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Room name must be at least 3 characters" })
        .max(30, { message: "Room name must be no more than 30 characters" })
        .trim()
});