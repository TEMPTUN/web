import User from "../../../model/user";
import connectmongo from "../../../utils/connect";

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

        const id = req.body.id;
        const selectedCats = req.body.selectedCats;
        //fetch the previous catergory id if we wan to update the category after login
        User.findByIdAndUpdate(id,{categoryId:[...selectedCats]},(err,doc)=>{
            if(err){
                res.status(400).json({message:"error occured"});
            }
        })
        res.status(200).json({message:"success"});
    }else if(req.method==='GET'){

        const id = req.query.id;
        await connectmongo();
        const result = await User.findById(id);
        res.status(200).json({result});
        
    }
  }
 
  export default handler;