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
    categoryId:[{ type:String }],
    profile:{
        data:Buffer,
        contentType:String   
    },
    bio:{
        type:String,
    },
    friendId:[{type:String}],
    date:{
        type:Date,
        default:Date.now
    }
});

const User =  models.User || model("User",user);

export default User;