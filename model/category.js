import { Schema,model,models } from "mongoose";

const category = new Schema({
    name:{
        type:String,
    },
    postIds:[{type:String,default:[]}],
    GroupsIds:[{type:String,default:[]}],
    userId:[{type:String,default:[]}],
})

const Category =  models.Category || model("Category",category);
export default Category;
