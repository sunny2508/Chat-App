import { WebSocketServer } from "ws";
import http, { IncomingMessage } from "http";
import { authenticateWs, type AuthenticateWebSocket } from "./auth.js";

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

        ws.send(JSON.stringify({success:true,message:"Connected"}));
    })
}

export {initWebSocket};