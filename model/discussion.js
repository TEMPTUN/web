import { Schema,model,models } from "mongoose";

const discussion = new Schema({
    userId:{
        type:String,
    },
    name:{
        type:String,
    },
    image:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    category:[{type:String,default:[]}],
    date:{
        type:Date,
        default:Date.now
    }
}, { timestamps: true });

const Discussion =  models.Discussion || model("Discussion",discussion);

export default Discussion;
