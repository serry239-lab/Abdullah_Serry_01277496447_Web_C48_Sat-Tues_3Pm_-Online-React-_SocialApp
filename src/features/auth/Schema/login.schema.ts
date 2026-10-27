import * as zod from "zod";

export const loginSchemaObj = zod
  .object({
    email: zod
      .string()
      .nonempty("this field is required")
      .email("non valid email"),
    password: zod
      .string()
      .nonempty("this field is required")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    
  })



export type loginSchema = zod.infer<typeof loginSchemaObj>