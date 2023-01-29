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
    experinceId:[
        {
            title:{type:String,default:""},
            company:{type:String,default:""},
            employtype:{type:String,default:""},
            start:{type:String,default:""},
            end:{type:String,default:""},
            location:{type:String,default:""},
        }
    ],
    educationId:[
        {
            school:{type:String,default:""},
            degree:{type:String,default:""},
            start:{type:String,default:""},
            end:{type:String,default:""},
            location:{type:String,default:""},
        }
    ],
    skillId:[{type:String,default:[]}],
    projectId:[
        {
            title:{type:String,default:""},
            description:{type:String,default:""},
            link:{type:String,default:""},
        }
    ],
    linkId:[{
        github:{type:String,default:""},
        linkedin:{type:String,default:""},
        instagram:{type:String,default:""},
    }],
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