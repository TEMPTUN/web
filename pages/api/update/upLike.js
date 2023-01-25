import User from "../../../model/user";

const handler = async(req, res)=> {
    if(req.method==='PUT'){
        try{
            let id = req.body.id;
            let arr = req.body.likes;
            const resp =  await User.findByIdAndUpdate(id,{$push:{"LikeId":arr}})
            res.status(200).json({message:"success",resp});
        }catch(err){
            console.log(err);
            res.status(404).json(err);
        }
    }else if(req.method==="GET"){
        try{
            let id = req.body.id;
            let arr = req.body.likes;
            const resp =  await User.findByIdAndUpdate(id,{$pull:{"LikeId":arr}})
            res.status(200).json({message:"success",resp});
        }catch(err){
            console.log(err);
            res.status(404).json(err);
        }
    }
}

export default handler;