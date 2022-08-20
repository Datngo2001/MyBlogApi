import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { CLIENT_URL, DATABASE_URL, PORT } from "./config"
import UserRouter from "./routes/user.route"
import AuthRouter from "./routes/auth.route"
import authMiddleware from "./middlewares/auth.middleware"

mongoose.connect(DATABASE_URL)
const database = mongoose.connection
database.on("error", (error)=>console.log(error))
database.once("open", () => console.log("Connected to database"))

const app = express()
app.use(express.json())
app.use(cors({
    origin: CLIENT_URL
}))
app.use(authMiddleware)

app.use("/auth", AuthRouter)
app.use("/user", UserRouter)

app.listen(PORT, ()=>{
    console.log("Server started")
})