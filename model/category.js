import { Schema,model,models } from "mongoose";

const category = new Schema({
    name:{
        type:String,
    },
    postIds:[{type:String,default:[]}],
    GroupsIds:[{type:String,default:[]}],
    userId:[{type:String,default:[]}],
    DisscussionId:[{type:String,default:[]}],
}, { timestamps: true })

const Category =  models.Category || model("Category",category);
export default Category;
