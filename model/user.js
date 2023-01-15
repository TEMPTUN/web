import { Schema,model,models } from "mongoose";

const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    categoryId:[],
    image:{
        type:String,
    },
    bio:{
        type:String,
    },
    friendId:[{type:String,default:[]}],
    PostId:[{type:String,default:[]}],
    date:{
        type:Date,
        default:Date.now
    }
});

const User =  models.User || model("User",user);

export default User;