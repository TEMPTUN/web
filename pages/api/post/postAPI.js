import Post from '../../../model/post'

const handler = async(req,res)=>{
    if(req.method==='GET' && req.query.other==='allPostsId'){
        try{
            const id = req.query.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await Post.findById(id);
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            console.log("---all post data fetch error--------------------");
            console.log(err);
            res.status(400).json({message:"error"});
        }
    }
}

export default handler;