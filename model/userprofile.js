import { Schema,model,models } from "mongoose";

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const User = model("User",user);

export default User;