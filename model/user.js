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
    categoryId:[{type:String,default:[],unique:true}],
    image:{
        type:String,
    },
    headline:{
        type:String,
    },
    friendId:[{type:String,default:[],unique:true}],
    PostId:[{type:String,default:[],unique:true}],
    LikeId:[{type:String,default:[],unique:true}],
    DisscussionId:[{type:String,default:[]}],
    experienceId:[{type:String,default:[]}],
    educationId:[{type:String,default:[]}],
    skillId:[{type:String,default:[]}],
    projectId:[{type:String,default:[]}],
    linkId:[{type:String,default:[]}],
    location:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const User =  models.User || model("User",user);

export default User;