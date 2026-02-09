import { z } from "zod";
declare const zodMessageSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type zodMessageInputs = z.infer<typeof zodMessageSchema>;
export { zodMessageSchema };
//# sourceMappingURL=messageSchema.d.ts.map