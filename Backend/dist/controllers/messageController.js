import mongoose, { Mongoose, Types } from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messagemodel.js";
import User from "../models/usermodel.js";
import { request } from "express";
import { zodMessageSchema } from "shared";
import { success } from "zod";
// get all contacts controller
const getAllContacts = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "You are unauthorised" });
        }
        const loggedInUser = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password -refreshToken");
        return res.status(200).json({ success: true, data: allUsers, message: "All contacts fetched successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in getting contacts", error.message);
        }
        return res.status(500).json({ success: false, message: "Cannot able to fetch all contacts,try again later" });
    }
};
// get message controller
const getMessage = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "You are unauthorised" });
        }
        const senderId = req.user._id;
        const { id: userToChatId } = req.params;
        if (!userToChatId) {
            return res.status(400).json({ success: false, message: "User to chat does not exist" });
        }
        const allMessages = await Message.find({ $or: [{ senderId: senderId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId }
            ] });
        return res.status(200).json({ success: true, data: allMessages, message: "Messages fetched successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in fetching messages", error.message);
        }
        return res.status(500).json({ success: false, message: "Not able to fetch messages right now,try again later" });
    }
};
//send message controller
const sendMessage = async (req, res) => {
    try {
        const result = zodMessageSchema.safeParse(req.body);
        if (!result.success) {
            const errMessage = result.error.issues[0]?.message;
            return res.status(400).json({ success: false, message: errMessage });
        }
        if (!req.user) {
            return res.status(401).json({ success: false, message: "You are unauthorised" });
        }
        const senderId = req.user._id;
        const { id: receiverId } = req.params;
        if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ success: false, message: "Reciever id is not valid" });
        }
        const { text } = result.data;
        let { image } = result.data;
        if (image !== undefined) {
            try {
                const uploadedResponse = await cloudinary.uploader.upload(image, {
                    folder: "message-image"
                });
                image = uploadedResponse.secure_url;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error occured in uploading image", error.message);
                }
                return res.status(500).json({ success: false, message: "Cannot send image right now,try again later" });
            }
        }
        const messageData = {
            senderId: senderId,
            receiverId: receiverId
        };
        if (text !== undefined) {
            messageData.text = text;
        }
        if (image !== undefined) {
            messageData.image = image;
        }
        const newMessage = await Message.create(messageData);
        return res.status(201).json({ success: true, data: newMessage, message: "Message sent successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in sending message", error.message);
        }
    }
    return res.status(500).json({ success: false, message: "Cannot send message right now,try again later" });
};
// get chat partners controller
// const getChatPartners = async(req:Request,res:Response)=>{
//     try{
//         if(!req.user)
//         {
//             return res.status(401).json({success:false,message:"You are unauthorised"});
//         }
//         const loggedInUser = req.user._id;
//         const messages = await Message.find(
//             {$or:[{senderId:loggedInUser},{receiverId:loggedInUser}],
//         },{senderId:1,receiverId:1}
//         );
//         const chatPartnerIds = [...new Set (messages.map((msg)=>
//             loggedInUser.toString() === msg.senderId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
//         ))];
//         const chatPartners = await User.find({_id:{$in:chatPartnerIds}}).select("-password -refreshToken")
//         return res.status(200).json({success:true,data:chatPartners,message:"Chat partners fetched successfully"});
//     }
//     catch(error:unknown)
//     {
//         if(error instanceof Error )
//         {
//             console.log("Error occured in getting chat partners",error.message);
//         }
//         return res.status(500).json({success:false,message:"Cannot load your chats right now,try again later"});
//     }
// }
// get chat Partner controller using aggregation pipeline
const getChatPartners = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "You are unauthorised" });
        }
        const loggedInUser = req.user._id;
        const chatPartners = await Message.aggregate([
            { $match: {
                    $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }]
                } },
            {
                $project: {
                    chatPartnerId: {
                        $cond: [
                            { $eq: ["$senderId", loggedInUser] },
                            "$receiverId",
                            "$senderId"
                        ]
                    },
                    createdAt: 1
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: "$chatPartnerId",
                    lastMessageAt: { $first: "$createdAt" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "singleUser"
                }
            },
            {
                $unwind: "$singleUser"
            },
            {
                $project: {
                    _id: 0,
                    singleUser: {
                        _id: "$singleUser._id",
                        name: "$singleUser.name",
                        email: "$singleUser.email",
                        profilePic: "$singleUser.profilePic"
                    },
                    lastMessageAt: 1
                }
            }
        ]);
        return res.status(200).json({ success: true, data: chatPartners, message: "Chats fetched successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error occured in fetching chat partners", error.message);
        }
        return res.status(500).json({ success: false, message: "Cannot load your chats right now,try again later" });
    }
};
export { getAllContacts, getMessage, sendMessage, getChatPartners };
//# sourceMappingURL=messageController.js.map