import User from "../../../model/user";
import connectmongo from "../../../utils/connect";

const handler = async(req, res)=> {
    if(req.method === 'GET'){
        const { email,password} = req.query;
        await connectmongo(); 
        const Userdata = await User.findOne({email:email,password:password});
        if(Userdata){
            res.status(200).json({ id:Userdata._id});
        }else{
            res.status(404).json({ "message":"User not found"} );
        }
    }
}

export default handler;