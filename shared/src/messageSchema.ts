import {z} from "zod"

const zodMessageSchema = z.object({
    text:z.string().trim().min(1,{error:"Message should be atleast 1 character long"}).max(1000,{error:"Message cannot be more than 1000 characters"}).optional()
});
    

export type zodMessageInputs = z.infer<typeof zodMessageSchema>

export {zodMessageSchema};