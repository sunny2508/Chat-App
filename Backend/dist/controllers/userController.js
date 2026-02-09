import { response } from "express";
import { signUpSchema, loginSchema, updateSchema } from "shared";
import User from "../models/usermodel.js";
import cloudinary from "../lib/cloudinary.js";
const generateAccessandRefreshToken = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User does not exist");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};
const signUp = async (req, res) => {
    try {
        const result = signUpSchema.safeParse(req.body);
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.map((issue) => {
                const field = issue.path[0];
                fieldErrors[field] = issue.message;
            });
            return res.status(400).json({ success: false, fieldErrors: fieldErrors });
        }
        const { name, email, password } = result.data;
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ success: false, message: "User already exist,please login" });
        }
        const newUser = await User.create({
            name,
            email,
            password
        });
        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
        return res.status(201).json({ success: true, data: createdUser, message: "User registered successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in signup", error);
        }
        return res.status(500).json({ success: false, message: "Error occured during signup,please try again later" });
    }
};
// login controller
const Login = async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.map((issue) => {
                const field = issue.path[0];
                fieldErrors[field] = issue.message;
            });
            return res.status(400).json({ success: false, fieldErrors: fieldErrors });
        }
        const { email, password } = result.data;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist,please register yourself first" });
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Password is not correct" });
        }
        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        const options = {
            httpOnly: true
        };
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ success: true, data: loggedInUser, message: "Login successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured during login", error);
        }
        return res.status(500).json({ success: false, message: "Error occured during login,please try again later" });
    }
};
//update controller
const updateInfo = async (req, res) => {
    try {
        const result = updateSchema.safeParse(req.body);
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.map((issue) => {
                const field = issue.path[0];
                fieldErrors[field] = issue.message;
            });
            return res.status(400).json({ success: false, fieldErrors: fieldErrors });
        }
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorised" });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        const { name, email, password } = result.data;
        let { profilePic } = result.data;
        if (name !== undefined) {
            user.name = name;
        }
        if (email !== undefined && email !== user.email) {
            const existingUser = await User.exists({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
            user.email = email;
        }
        if (password !== undefined) {
            user.password = password;
        }
        if (profilePic !== undefined) {
            if (user.profilePic?.publicId) {
                try {
                    await cloudinary.uploader.destroy(user.profilePic.publicId);
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log("Error occured in deleting profilePic", error.message);
                    }
                    return res.status(500).json({ success: false, message: "Cannot update your profile pic right now , try again later" });
                }
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
                folder: "profile-pic"
            });
            user.profilePic = {
                url: uploadedResponse.secure_url,
                publicId: uploadedResponse.public_id
            };
        }
        await user.save({ validateBeforeSave: false });
        const updatedUser = await User.findById(user._id).select("-password -refreshToken");
        return res.status(200).json({ success: true, data: updatedUser, message: "Profile updated successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error in updating profile", error.message);
        }
        return res.status(500).json({ success: false, message: "Cannot update profile right now ,try again later" });
    }
};
//logOut controller
const logOut = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorised" });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $unset: { refreshToken: "" }
        }, {
            new: true
        });
        const options = {
            httpOnly: true
        };
        res.clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in logout", error.message);
        }
        return res.status(500).json({ success: false, message: "Cannot logout right now, please try again later" });
    }
};
const checkAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "You are unauthorised" });
        }
        const user = await User.findById(req.user._id).select("-password -refreshToken");
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
        return res.status(200).json({ success: true, data: user, message: "You are authorised" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in checking authentication", error.message);
        }
        return res.status(500).json({ success: false, message: "Cannot check authentication right not,try again later" });
    }
};
export { signUp, Login, updateInfo, logOut, checkAuth };
//# sourceMappingURL=userController.js.map