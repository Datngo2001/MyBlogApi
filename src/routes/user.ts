import user from '../models/user'
import express from "express"

const UserRouter = express.Router()

UserRouter.get("/", async (req, res)=>{
    try {
        const users = await user.find()
        res.json(users)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
})

export default UserRouter