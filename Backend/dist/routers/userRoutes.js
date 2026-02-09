import { signUp, Login, updateInfo, logOut, checkAuth } from "../controllers/userController.js";
import express from "express";
import verifyJWT from "../middlewares/authmiddleware.js";
const router = express.Router();
router.get("/checkauth", verifyJWT, checkAuth);
router.post("/signup", signUp);
router.post("/login", Login);
router.patch("/updateinfo", verifyJWT, updateInfo);
router.post("/logout", verifyJWT, logOut);
export default router;
//# sourceMappingURL=userRoutes.js.map