import { z } from "zod";
const zodMessageSchema = z.object({
    text: z.string().trim().min(1, { error: "Message should be atleast 1 character long" }).max(1000, { error: "Message cannot be more than 1000 characters" }).optional(),
    image: z.string().optional()
}).refine((data) => !!data.text || !!data.image, {
    error: "Message must contain text or image"
});
export { zodMessageSchema };
//# sourceMappingURL=messageSchema.js.map