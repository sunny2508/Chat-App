import mongoose from "mongoose";

const connectDB = async():Promise<void>=>{
    
    const mongoDbUrl = process.env.MONGODB_URL

    if(!mongoDbUrl)
    {
        console.log("Not found mongodb url");
        process.exit(1);
    }

    try{
        await mongoose.connect(mongoDbUrl);
        console.log("MongoDb connected successfully");
    }
    catch(error:unknown)
    {
        console.log("Error occured in connecting to MongoDb");
        process.exit(1);
    }
}

export default connectDB;