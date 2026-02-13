import multer from "multer";
import  type { Request } from "express";

const storage = multer.memoryStorage();

export const uploadMiddleware = multer({
    storage,
    limits:{fileSize:10 * 1024 * 1024},//10 mb file size
    fileFilter:(req:Request,file,cb)=>{
        console.log("MIME type:",file.mimetype);
        console.log("Original name:",file.originalname);
        if(!file.mimetype.startsWith("image/"))
        {
            return cb(new Error("Only Image fields are allowed"));
        }
        cb(null,true);
    }
})