import User from "../../../model/user";
import connectmongo from "../../../utils/mongoconnect";

const handler = async(req, res)=> {
    if(req.method === 'POST'){
        // await connectmongo();
        try{
            const { name,email,password,profilePic } = req.body; 
            const Userdata = new User({
                name: name,
                email: email,
                password: password,
                image:profilePic,
            })
            const result = await User.insertMany([Userdata]);
            res.status(200).json({ id:result[0]._id,message:"User connected Succesfully"});
        }catch{
            res.status(400).json({message:"error occured"});
        }
    }else if(req.method === 'PUT'){
        try{
            const id = req.body.id;
            const selectedCats = req.body.selectedCats===undefined?[]:req.body.selectedCats;
            const postIds =  req.body.postIds===undefined?[]:req.body.postIds._id;
            const r = User.findByIdAndUpdate(id,{
                    $addToSet:{"categoryId":{$each:selectedCats}},
                    $push:{"PostId": postIds}
                    },(err,doc)=>{
                if(err){
                    res.status(400).json({message:"mongo error occured"});
                }
            })
                res.status(200).json({message:"success"});
            }catch{
                res.status(400).json({message:"error"});
            }
    }else if(req.method==='GET'){
        try{
            const id = req.query.id;
            await connectmongo();
            const result = await User.findById(id);
            res.status(200).json({result,message:"got user details"});
        }catch{
            res.status(400).json({message:"error occured"});
        }
    }
  }
 
  export default handler;