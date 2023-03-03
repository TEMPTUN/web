import Category from "../../../model/category";

export default async function handler(req,res){
    if(req.method === 'GET'){

        // CATEGORY FETCHED BY NAME FOR POSTS

        const {catname} = req.query;
        try {
            const result=await Category.find({name:catname}).select("postIds").sort({'postIds':-1});
            res.status(200).json({success:true,result});
        } catch (error) {
            res.status(500).json({success:false,message:error.message});
        }
    }
}