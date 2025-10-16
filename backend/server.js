import express from "express"
import dotenv from "dotenv"
import {connectdb} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import taskroutes from "./routes/task.route.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json())


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskroutes);




connectdb()
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})