import Category from '../../../model/category';

const handler = async(req,res)=>{
    if(req.method==='POST'){
        let {postId,category,userId} = req.body;
        category.map((cat,idx)=>{
            const ct = cat.toLowerCase();
            postId = postId===undefined?[]:postId;
            userId = userId===undefined?[]:userId;

            const resp=Category.findOneAndUpdate({name:ct},{$push:{"postIds":postId},$push:{"userId":userId}},(err,doc)=>{
                if(err){
                    console.log(err)
                }
            });
            console.log(resp);
        }) 
        res.status(200).json({message:"success"}); 
    }
}
export default handler;