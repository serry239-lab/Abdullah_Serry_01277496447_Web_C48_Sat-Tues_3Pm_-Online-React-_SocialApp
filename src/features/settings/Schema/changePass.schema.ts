import * as zod from "zod";

export const changePasswordSchemaObj = zod
  .object({
    password: zod.string().min(1, "Current password is required"),
    newPassword: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Must be at least 8 chars with uppercase, lowercase, number, and special character"
      ),
    confirmPassword: zod.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchema = zod.infer<typeof changePasswordSchemaObj>;