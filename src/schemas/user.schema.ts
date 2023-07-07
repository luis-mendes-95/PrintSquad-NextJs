import {z} from "zod"

export const userSchema = z.object({
    name:z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string()
})

export const loginSchema = userSchema.omit({
  name: true,
  phone: true
});

export const UserLoggedInSchema = userSchema.omit({
  password: true
});

export type UserData = z.infer<typeof userSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type LoggedInUser = z.infer<typeof UserLoggedInSchema>;