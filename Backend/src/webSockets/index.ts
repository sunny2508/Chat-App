import { WebSocketServer } from "ws";
import http from "http";

const allowedOrigins = ["http://localhost:5173"];

const initWebSocket = (server:http.Server)=>{
    const wss = new WebSocketServer({server,
        verifyClient:({origin,req},done)=>{
            if(allowedOrigins.includes(origin))
            {
                done(true);//allowed connection
            }
            else{
                done(false,403,"forbidden")//reject
            }
        }
    });

    wss.on("connection",(ws,req)=>{

    });
}

export {initWebSocket};