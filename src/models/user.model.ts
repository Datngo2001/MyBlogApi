import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    hash_password: {
        type: String,
        require: true,
    },
    createDate:{
        type: Date,
        require: true,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema)

export default User
