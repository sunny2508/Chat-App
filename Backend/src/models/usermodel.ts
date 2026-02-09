import mongoose,{Schema,Document} from "mongoose";
import bcryptjs from "bcryptjs"
import type { SignOptions }  from "jsonwebtoken";
import jwt from "jsonwebtoken";


export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    profilePic:{
        url:string,
        publicId:string
    }
    refreshToken:string;

    isPasswordCorrect(password:string):Promise<boolean>;
    generateAccessToken():string;
    generateRefreshToken():string;
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    profilePic:{
        url:{
            type:String
        },
        publicId:{
            type:String,
        }
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true});

// middleware to hash password before saving

userSchema.pre<IUser>("save",async function(this:IUser){

    if(!this.isModified("password"))
    {
        return;
    }

    this.password = await bcryptjs.hash(this.password,10);
})

//method to compare password

userSchema.methods.isPasswordCorrect = async function(password:string):
Promise<boolean>{

    return await bcryptjs.compare(password,this.password);
}

//method to generate access Token

userSchema.methods.generateAccessToken = function(this:IUser):string{

    const payload = {
        _id:this._id,
        name:this.name,
        email:this.email
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;

    if(!secret)
    {
        throw new Error("Access token secret is undefined");
    }

    const expiry = process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];

    if(!expiry)
    {
        throw new Error("Access token expiry is undefined");
    }

    const options:SignOptions = {
        expiresIn:expiry
    }

    return jwt.sign(payload,secret,options);
}

//method to generate refresh Token

userSchema.methods.generateRefreshToken = function(this:IUser):string{

    const payload = {
        _id:this._id,
        name:this.name,
        email:this.email
    }

    const secret = process.env.REFRESH_TOKEN_SECRET;

    if(!secret)
    {
        throw new Error("Refresh token secret is not defined");
    }

    const expiry = process.env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];

    if(!expiry)
    {
        throw new Error("Refresh token expiry date is undefined");
    }

    const options:SignOptions = {
        expiresIn:expiry
    }

    return jwt.sign(payload,secret,options);
}

const User = mongoose.model("User",userSchema);

export default User;
