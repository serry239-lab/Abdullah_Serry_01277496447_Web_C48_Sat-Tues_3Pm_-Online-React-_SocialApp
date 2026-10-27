import * as zod from "zod";

export const registerSchemaObj = zod
  .object({
    name: zod
      .string()
      .nonempty("this field is required")
      .min(2, "minimum 2 characters")
      .max(25, "maximum 25 characters"),
    username: zod
      .string()
      .min(2, "minimum 2 characters")
      .max(25, "maximum 25 characters")
      .optional(),
    email: zod
      .string()
      .nonempty("this field is required")
      .email("non valid email"),
    gender: zod.enum(["female", "male","Female","Male"]),
    password: zod
      .string()
      .nonempty("this field is required")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    rePassword: zod.string().nonempty("this field is required"),
    dateOfBirth: zod.string().refine(
      (data) => {
        const myYear = new Date(data).getFullYear();
        const thisYear = new Date().getFullYear();
        return thisYear - myYear > 10;
      },
      {
        message: "User must be older than 10 years",
      },
    ),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "passwords dont match",
    path: ["rePassword"],
  });


export  type registerSchema = zod.infer<typeof registerSchemaObj>