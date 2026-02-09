import jwt,{type JwtPayload} from "jsonwebtoken"
import type { Request,Response,NextFunction } from "express";
import User,{type IUser} from "../models/usermodel.js";

interface DecodedTokenType extends JwtPayload{
    _id:string;
    name:string;
    email:string;
}

declare global{
    namespace Express{
        interface Request{
            user?:IUser;
        }
    }
}


const verifyJWT = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

        if(!token)
        {
            return res.status(401).json({success:false,message:"Token expired or not valid,please login again"});
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as DecodedTokenType;

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if(!user)
        {
            return res.status(401).json({success:false,message:"Your session expired,please login again"});
        }

        req.user = user;
        next();
    }
    catch(error:unknown)
    {
        if(error instanceof Error)
        {
            console.log("Error occured in verifying token",error.message);
        }
        return res.status(500).json({success:false,message:"Cannot process your request now,please try again later"});
    }
}

export default verifyJWT;