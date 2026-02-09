import type { Request, Response, NextFunction } from "express";
import { type IUser } from "../models/usermodel.js";
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
declare const verifyJWT: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default verifyJWT;
//# sourceMappingURL=authmiddleware.d.ts.map