import bcrypt from "bcrypt"

export default function comparePassword(password: string = "", hash_password: string = ""){
    return bcrypt.compareSync(password, hash_password);
}