import { Schema,model,models } from "mongoose";

const group = new Schema({
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
    about:{
        type:String,
    },
    description:{
        type:String,
    },
    Compensation:{
        type:String,
    },
    company:{
        type:String,
    },
    groupEmail:{
        type:String,
    },
    category:[{type:String,default:[]}],
    location:{
        type:String,
    }

}, { timestamps: true });

const Group = models.Group || model("Group",group);
export default Group;