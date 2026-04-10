import {IncomingMessage} from "http";
import type { DecodedTokenType } from "../middlewares/authmiddleware.js";
import type { IUser } from "../models/usermodel.js";
import cookie from "cookie"
import jwt from "jsonwebtoken"
import User from "../models/usermodel.js";


const authenticatedWs = async(req:IncomingMessage):Promise<IUser> =>{
    const cookies = cookie.parse(req.headers.cookie || "");

    const token = cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if(!token)
    {
        throw new Error("Token not found");
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as DecodedTokenType;

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if(!user)
    {
        throw new Error("User does not exist");
    }

    return user;
}

export {authenticatedWs};