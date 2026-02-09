import jwt, {} from "jsonwebtoken";
import User, {} from "../models/usermodel.js";
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Token expired or not valid,please login again" });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ success: false, message: "Your session expired,please login again" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in verifying token", error.message);
        }
        return res.status(500).json({ success: false, message: "Cannot process your request now,please try again later" });
    }
};
export default verifyJWT;
//# sourceMappingURL=authmiddleware.js.map