import Post from '../../../model/post'

const handler = async(req, res)=> {
    let ans=null;
    if(req.method === 'PUT'){
        try{
            const id  = req.body.id;
            const likeId =  req.body?.likeId;
            const likenum = req.body?.likenum;
            Post.watch().on('change', data => {
                ans=data;
            });
            
            const r= Post.findByIdAndUpdate(id,{
                $push:{"likeId":likeId,"likenum":likenum}},(err,doc)=>{
                    if(err){
                        res.status(400).json(err.message);
                    }
            })
            
            setTimeout(() => {
                res.status(200).json(ans.updateDescription.updatedFields);
            }, "5000");
            
        }
        catch{
            res.status(400).json({message:"error occured"});
        }
    }
}

export default handler;