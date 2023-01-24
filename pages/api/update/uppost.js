import Post from '../../../model/post'

const handler = async(req, res)=> {
    if(req.method === 'PUT'){
        try{
            const id  = req.body.id;
            const likeId =  req.body?.likeId;
            const likenum = req.body?.likenum;
            Post.watch().on('change', data => {
                console.log(data);
            });
            
            const r= Post.findByIdAndUpdate(id,{
                $push:{"likeId":likeId}},(err,doc)=>{
                    if(err){
                        res.status(400).json(err.message);
                    }
            })
            
            res.status(200).json({message:"success"});
            
        }
        catch{
            res.status(400).json({message:"error occured"});
        }
    }
}

export default handler;