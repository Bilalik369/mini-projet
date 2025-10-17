import express from "express"
import dotenv from "dotenv"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import {connectdb} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import taskroutes from "./routes/task.route.js"
import {initializeSocketEvents}  from "./events/taskEvents.js"
dotenv.config();

const app = express();
const httpServer = createServer(app)

const io = new Server(httpServer , {
    cors :{
     origin:  "http://localhost:3000",
     methods: ["GET", "POST", "PUT", "DELETE"],
     credentials: true,
    }
})

const PORT = process.env.PORT

app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)

app.set("io", io)

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskroutes);

initializeSocketEvents(io) 


connectdb()
httpServer.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
    console.log(`Socket.IO server is ready`)
})