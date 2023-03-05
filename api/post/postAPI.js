import connectmongo from "../../utils/mongoconnect";

const handler = async(req,res)=>{
    await connectmongo();
    if(req.method==='GET' && req.query.other==='allPostsId'){

        // POST DATA FETCHED BY POST ID

        try{
            const id = req.query.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await Post.findById(id).sort({'createdAt':-1});
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            res.status(400).json({message:"error"});
        }
    }
}

export default handler;