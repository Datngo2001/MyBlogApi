import express from "express"
import mongoose from "mongoose"
import { DATABASE_URL } from "./config"
import UserRouter from "./routes/user"

mongoose.connect(DATABASE_URL)
const database = mongoose.connection
database.on("error", (error)=>console.log(error))
database.once("open", () => console.log("Connected to database"))

const app = express()
app.use(express.json())

app.use("/user", UserRouter)

app.listen(3001, ()=>{
    console.log("Server started")
})