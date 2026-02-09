import {z} from "zod"

const signUpSchema = z.object({
    name:z.string().min(1,{error:"Name should be atleast 1 character long"})
    .max(100,{error:"Name should not exceed from 100 characters"}),

    email:z.email({error:"Email is not in correct format"}),
    

    password:z.string().min(6,{error:"Password should be atleast 6 character long"})
    .regex(/[A-Z]/,{error:"Password should have atleast one uppercase letter"})
    .regex(/[a-z]/,{error:"Password should have atleast 1 lowercase letter"})
    .regex(/[\W_]/,{error:"Password should have one special character"})
});

const updateSchema = signUpSchema.partial().extend({
    profilePic:z.url().optional()
}).refine((obj)=>Object.keys(obj).length>0,{error:"Atleast 1 field must be provided"});

const loginSchema = signUpSchema.pick({
    email:true,
    password:true
})

 export type signUpInputs = z.infer<typeof signUpSchema>

 export type loginInputs = z.infer<typeof loginSchema>

 export type updateInputs = z.infer<typeof updateSchema>

export {signUpSchema,loginSchema,updateSchema}

