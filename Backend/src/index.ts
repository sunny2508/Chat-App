import "dotenv/config"
import connectDB from "./database/db.js"
import app from "./app.js"
import { WebSocketServer } from "ws";
import http from "http";

const port = process.env.PORT || 5000;

//create http server
const server = http.createServer(app);

//attach websocket to this http server
export const wss = new WebSocketServer({server});


const getConnection = async():Promise<void>=>{
    try{
      await connectDB();
      server.listen(port,()=>{
        console.log(`Server started at port ${port}`);
      })
    }
    catch(error:unknown)
    {
      console.log("Error occured in starting server",error);
    }
}

getConnection();