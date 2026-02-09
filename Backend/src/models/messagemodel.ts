import mongoose, { Schema,Document, Types, Model} from "mongoose";

export interface IMessage extends Document
{
    senderId:Types.ObjectId;
    receiverId:Types.ObjectId;
    text?:string;
    image?:string;
}

const messageSchema = new Schema<IMessage>({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String
    }
},{timestamps:true});

const Message = mongoose.model("Message",messageSchema);

export default Message;



