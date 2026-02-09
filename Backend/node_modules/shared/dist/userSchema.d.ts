import { z } from "zod";
declare const signUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const updateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    password: z.ZodOptional<z.ZodString>;
    profilePic: z.ZodOptional<z.ZodURL>;
}, z.core.$strip>;
declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type signUpInputs = z.infer<typeof signUpSchema>;
export type loginInputs = z.infer<typeof loginSchema>;
export type updateInputs = z.infer<typeof updateSchema>;
export { signUpSchema, loginSchema, updateSchema };
//# sourceMappingURL=userSchema.d.ts.map