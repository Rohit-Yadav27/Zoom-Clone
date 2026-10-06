import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {createServer} from "node:http"
// import { Server } from "socket.io";

import  mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const PORT = process.env.PORT || 3000
const uri = process.env.MONGO_URL;

mongoose.connect(uri).then(()=>{
    console.log("connect ot db")
})

app.use(express.urlencoded({limit:"40kb" ,extended: true }));
app.use(express.json({limit:"40kb"}));

app.use(cookieParser());
app.use("/",authRoutes);


app.use((req,res)=>{
   res.send("hello") 
})

server.listen(PORT,()=>{
    console.log("listen on port number 3000");
});

