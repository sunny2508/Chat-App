import "dotenv/config"
import connectDB from "./database/db.js"
import app from "./app.js"
import http from "http";
import { initWebSocket } from "./webSockets/index.js";


const port = process.env.PORT || 5000;


//create http server
const server = http.createServer(app);

//attach websocket to it
initWebSocket(server);


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