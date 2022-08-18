import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    createDate:{
        type: Date,
        require: true,
        default: Date.now
    }
})
export default mongoose.model("User", userSchema)
