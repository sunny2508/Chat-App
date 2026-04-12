import { WebSocket,WebSocketServer } from "ws";

const broadCast = (wss:WebSocketServer,data:Object)=>
{
    wss.clients.forEach((client)=>{
      if(client.readyState === WebSocket.OPEN)
      {
        client.send(JSON.stringify(data));
      }
    })
}

export {broadCast};