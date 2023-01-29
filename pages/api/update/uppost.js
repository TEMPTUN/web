import Post from '../../../model/post'

const handler = async(req, res)=> {
    if(req.method === 'PUT'){

        // POST LIKES UPDATED

        try{
            const id  = req.body?.id;
            const likeId =  req.body?.likeId;           
            Post.findByIdAndUpdate(id,{
                $push:{"likeId":likeId}},(err,doc)=>{
                    if(err){
                        res.status(400).json(err.message);
                    }
            })
            res.status(200).json({message:err.message});
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    }
}

export default handler;