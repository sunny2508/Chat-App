import { type Request, type Response } from "express";
declare const getAllContacts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const sendMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getChatPartners: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { getAllContacts, getMessage, sendMessage, getChatPartners };
//# sourceMappingURL=messageController.d.ts.map