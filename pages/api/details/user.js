import User from "../../../model/user";
import connectmongo from "../../../utils/mongoconnect";

const handler = async(req, res)=> {
    if(req.method === 'POST'){

        const { name,email,password,profilePic } = req.body; 
        await connectmongo();
        const Userdata = new User({
            name: name,
            email: email,
            password: password,
            image:profilePic,
        })
        const result = await User.insertMany([Userdata]);
        res.status(200).json({ id:result[0]._id});
    }else if(req.method === 'PUT'){
        try{
            const id = req.body.id;
            const selectedCats = req.body.selectedCats===undefined?[]:req.body.selectedCats;
            const postIds =  req.body.postIds===undefined?[]:req.body.postIds._id;
            const friendId = req.body.friendId===undefined?[]:req.body.friendId;
            const r = User.findByIdAndUpdate(id,{
                $push:{"categoryId":{$each:selectedCats},"PostId": postIds,"friendId":friendId}},(err,doc)=>{
                    if(err){
                        res.status(400).json({message:"mongo error occured"});
                    }
            })
                res.status(200).json({message:"success"});
            }catch{
                res.status(400).json({message:"error"});
            }
    }else if(req.method==='GET' && req.query.other===undefined){ //user info
        const id = req.query.id;
        await connectmongo();
        const result = await User.findById(id);
        res.status(200).json({result});
    }else if(req.method==='GET' && req.query.other==="allFriendsId"){  //all user info
        try{
            const id = req.query.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await User.findById(id).select("name image");
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            console.log("---all user data fetch error--------------------");
            console.log(req.query.id);
            console.log(err);
            res.status(400).json({message:"error"});
        }
    }else if(req.method==='GET' && req.query.other==="allPostsId"){
        try{
            const id = req.query.id;
            if(id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await User.findById(id).select("PostId");
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            console.log("---all user data fetch error--------------------");
            console.log(req.query.id);
            console.log(err);
            res.status(400).json({message:"error"});
        }
    }
  }
 
  export default handler;