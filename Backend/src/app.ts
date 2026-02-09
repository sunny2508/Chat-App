import express from "express"
import cookieParser from "cookie-parser"
import userRoutes from "./routers/userRoutes.js"
import messageRoutes from "./routers/messageRoutes.js"
import cors from "cors"

const app = express();

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/messages",messageRoutes);


export default app;

