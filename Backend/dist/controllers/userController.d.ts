import { type Request, type Response } from "express";
declare const signUp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const Login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const updateInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const logOut: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const checkAuth: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { signUp, Login, updateInfo, logOut, checkAuth };
//# sourceMappingURL=userController.d.ts.map