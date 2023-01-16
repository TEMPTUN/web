import { Schema,model,models } from "mongoose";

const post = new Schema({
    userId:{
        type:String,
    },
    name:{
        type:String,
    },
    image:{
        type:String,
    },
    media:{
        type:String,
        default:null
    },
    url:{
        type:String,   
        default:null
    },
    description:{
        type:String,
        
    },
    likeId:[{type:String}],
    commentId:[{type:String}],
    categoryId:[],
    date:{
        type:Date,
        default:Date.now
    }
});

const Post =  models.Post || model("Post",post);

export default Post;