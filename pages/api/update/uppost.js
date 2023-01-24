import Post from '../../../model/post'

const handler = async(req, res)=> {
    if(req.method === 'PUT'){
        try{
            const id  = req.body?.id;
            const likeId =  req.body?.likeId;
            await Post.findByIdAndUpdate(id,{
                $push:{"likeId":likeId}});
            res.status(200).json({message:"success"});
        }
        catch{
            res.status(400).json({message:"error occured"});
        }
    }else if(req.method==="GET"){
        try{
            const id  = req.body?.id;
            const likeId =  req.body?.likeId;
            await Post.findByIdAndUpdate(id,{
                $pull:{"likeId":likeId}});
            res.status(200).json({message:"success"});
        }
        catch{
            res.status(400).json({message:"error occured"});
        }
    }
}

export default handler;