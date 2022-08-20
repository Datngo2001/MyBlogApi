import User from "../models/user.model"
import express from "express"

const UserRouter = express.Router()

UserRouter.get("/", async (req, res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
})

export default UserRouter