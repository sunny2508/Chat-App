import { WebSocketServer } from "ws";
import http, { IncomingMessage } from "http";
import { authenticateWs, type AuthenticateWebSocket } from "./auth.js";
import { addUser, getOnlineUsers, removeUser } from "./usersMap.js";
import { broadCast } from "./broadcast.js";

const allowedOrigins = ["http://localhost:5173"];

const initWebSocket = (server:http.Server)=>{

    const wss = new WebSocketServer({server,
        verifyClient:({origin,req},done)=>{
            if(allowedOrigins.includes(origin))
            {
                done(true)//accepted
            }
            else{
                done(false);//rejected
            }
        }
    })

    wss.on("connection",async(ws:AuthenticateWebSocket,req:IncomingMessage)=>{

        const isAuthenticated = await authenticateWs(ws,req);

        if(!isAuthenticated)
        {
            return;
        }

        if(!ws.user)
        {
            return;
        }

        const userId = ws.user._id.toString();
        addUser(userId,ws);

        console.log("A user connected",ws.user.name);

        broadCast(wss,{type:"getOnlineUsers",data:getOnlineUsers()});

        ws.send(JSON.stringify({success:true,message:"Connected"}));

        ws.on("close",()=>{
            
            removeUser(userId);//user removed

            console.log("A user disconnected",ws.user?.name);

            broadCast(wss,{type:"getOnlineUsers",data:getOnlineUsers()});
        })
    })
}

export {initWebSocket};