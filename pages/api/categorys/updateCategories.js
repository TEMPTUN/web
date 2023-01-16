import Category from '../../../model/category';

const handler = async(req,res)=>{
    if(req.method==='GET' && req.query.other==='friendId'){  //fetching usersId for given category 
        const {category} = req.query;
        const resp= await Category.find({"name":category}).select("userId");
        if(resp){
            res.status(200).json({ success:true,resp});
        }else{
            res.status(404).json({ "message":"please enter valid username or password.",success:false } );
        }

    }else if(req.method==='GET' && req.query.other==='postId'){
        const {category} = req.query;
        const resp= await Category.find({"name":category}).select("postIds");
        if(resp){
            res.status(200).json({ success:true,resp});
        }else{
            res.status(404).json({ "message":"please enter valid postId.",success:false } );
        }
    }else if(req.method==='POST'){
        let {postId,category,userId} = req.body;
        console.log(req.body);
        category.map((cat)=>{
            const ct = cat.toLowerCase();
            const pId = postId===undefined?[]:postId._id;
            userId = userId===undefined?[]:userId;
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