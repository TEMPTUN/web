import Category from '../../../model/category';

const handler = async(req,res)=>{
    if(req.method==='POST'){
        let {postId,category,userId} = req.body;
        console.log(req.body);
        category.map((cat)=>{
            const ct = cat.toLowerCase();
            const pId = postId===undefined?[]:postId._id;
            userId = userId===undefined?[]:userId;
            console.log(pId);
            Category.findOneAndUpdate({name:ct},{$push:{"userId":userId,"postIds":pId}},(err,doc)=>{
                if(err){
                    console.log("---------categoryAPI------------");
                    console.log(err);
                }
            });
        }) 
        res.status(200).json({message:"success"}); 
    }
}
export default handler;