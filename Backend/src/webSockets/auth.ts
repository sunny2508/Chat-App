import { WebSocket } from "ws";
import  {IncomingMessage} from "http"
import type { DecodedTokenType } from "../middlewares/authmiddleware.js";
import type { IUser } from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import cookie from "cookie"
import User from "../models/usermodel.js";


export interface AuthenticateWebSocket extends WebSocket{
  user:IUser;
}

const authenticateWs = async (ws:AuthenticateWebSocket,req:IncomingMessage):Promise<boolean> =>{
  try{
      const cookies = cookie.parse(req.headers.cookie || "");

      const token = cookies.accessToken || req.headers.authorization?.split(" ")[1];

      if(!token)
      {
        ws.close(4001,"Token not found");
        return false;
      }

      const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as DecodedTokenType;

      const user = await User.findById(decodedToken._id).select("-password -refreshToken");

      if(!user)
      {
        ws.close(4002,"User does not exist");
        return false;
      }

      ws.user = user;
      return true;
  }
  catch(error:unknown)
  {
    if(error instanceof Error)
    {
      console.log("Token not valid  or expired",error.message);
    }
    ws.close(4003,"Token not valid");
    return false;
  }
}

export {authenticateWs};