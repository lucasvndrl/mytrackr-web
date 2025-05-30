import { z } from "zod";

const createAccountSchema = z.object({
  account: z.object({
    user_id: z.string(),
    username: z
      .string()
      .min(5, {
        message: "Username must have at least 5 characters",
      })
      .max(20, {
        message: "Username must have less than 20 characters",
      }),
    favorite_genres: z.array(z.string()),
    avatar: z.string().optional(),
  }),
});

export const accountSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must have at least 5 characters" })
    .max(20, { message: "Username must have less than 20 characters" }),
  avatar: z.string().optional(),
  favorite_genres: z
    .array(z.string())
    .min(1, { message: "Select at least one genre" }),
});

const updateAccountSchema = z.object({
  account: z.object({
    username: z
      .string()
      .min(5, {
        message: "Username must have at least 5 characters",
      })
      .max(20, {
        message: "Username must have less than 20 characters",
      })
      .optional(),
    avatar: z.string().optional(),
  }),
});

export { createAccountSchema, updateAccountSchema };
