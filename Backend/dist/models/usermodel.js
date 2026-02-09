import mongoose, { Schema, Document } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    profilePic: {
        url: {
            type: String
        },
        publicId: {
            type: String,
        }
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true });
// middleware to hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcryptjs.hash(this.password, 10);
});
//method to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
};
//method to generate access Token
userSchema.methods.generateAccessToken = function () {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new Error("Access token secret is undefined");
    }
    const expiry = process.env.ACCESS_TOKEN_EXPIRY;
    if (!expiry) {
        throw new Error("Access token expiry is undefined");
    }
    const options = {
        expiresIn: expiry
    };
    return jwt.sign(payload, secret, options);
};
//method to generate refresh Token
userSchema.methods.generateRefreshToken = function () {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error("Refresh token secret is not defined");
    }
    const expiry = process.env.REFRESH_TOKEN_EXPIRY;
    if (!expiry) {
        throw new Error("Refresh token expiry date is undefined");
    }
    const options = {
        expiresIn: expiry
    };
    return jwt.sign(payload, secret, options);
};
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=usermodel.js.map