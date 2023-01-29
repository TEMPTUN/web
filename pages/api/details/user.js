import User from "../../../model/user";
import connectmongo from "../../../utils/mongoconnect";

const handler = async(req, res)=> {

    // INTIAL USER DATA POSTED

    if(req.method === 'POST'){
        await connectmongo();
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
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }

    // USER DATA UPDATED WITH POSTS,CATEGORYS AND FRIENDS

    else if(req.method === 'PUT'){
        try{
            const id = req.body.id;
            const selectedCats = req.body?.selectedCats;
            const postIds =  req.body?.postIds;
            const friendId = req.body?.friendId;
            User.findByIdAndUpdate(id,{
                $push:{"categoryId":{$addToSet:{$each:selectedCats}},"PostId":{$addToSet:postIds},"friendId":{$addToSet:friendId}}},(err,doc)=>{
                    if(err){
                        res.status(400).json({message:"mongo error occured"});
                    }
            })
                res.status(200).json({message:"success"});
            }catch(err){
                res.status(400).json({message:err.message});
            }
    }

    // USER DATA FETCHED
    
    else if(req.method==='GET' && req.query.other===undefined){ 
        const id = req.query.id;
        await connectmongo();
        const result = await User.findById(id);
        res.status(200).json({result});
    }

    // USER FRIENDS DATA FETCHED
    
    else if(req.method==='GET' && req.query.other==="allFriendsId"){  
        try{
            const id = req.query.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await User.findById(id).select("name image");
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
    
    // USER POST DATA FETCHED
    
    else if(req.method==='GET' && req.query.other==="allPostsId"){
        try{
            const id = req.query.id;
            if(id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await User.findById(id).select("PostId");
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
  }
 
  export default handler;