import { signUp,Login,updateInfo,logOut,checkAuth, uploadProfile } from "../controllers/userController.js";
import express from "express"
import verifyJWT from "../middlewares/authmiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadmiddleware.js";

const router = express.Router();

router.get("/checkauth",verifyJWT,checkAuth);
router.post("/signup",signUp);
router.post("/login",Login);
router.patch("/updateinfo",verifyJWT,updateInfo);
router.post("/logout",verifyJWT,logOut);
router.post("/upload-profile",verifyJWT,uploadMiddleware.single("profilePic"),uploadProfile);

export default router;
