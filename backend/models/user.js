import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userType:{type:String,enum: ["student", "admin", "guard"], default: "student"},
});
const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel;