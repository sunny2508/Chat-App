import express from "express"
import { getAllContacts,getMessage,getChatPartners,sendMessage } from "../controllers/messageController.js";
import verifyJWT from "../middlewares/authmiddleware.js";
import useRateLimit from "../middlewares/ratelimiter.js";

const router = express.Router();

router.get("/contacts",verifyJWT,getAllContacts);
router.get("/chats",verifyJWT,getChatPartners);
router.post("/send/:id",verifyJWT,useRateLimit,sendMessage);
router.get("/:id",verifyJWT,getMessage);


export default router;