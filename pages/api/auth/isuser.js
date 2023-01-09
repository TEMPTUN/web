import User from "../../../model/user";
import connectmongo from "../../../utils/connect";

const handler = async(req, res)=> {
    if(req.method === 'GET'){
        const { email,password} = req.query;
        await connectmongo(); 
        const Userdata = await User.findOne({email:email,password:password});
        if(Userdata){
            res.status(200).json({ id:Userdata._id,success:true });
        }else{
            res.status(404).json({ "message":"please enter valid username or password.",success:false } );
        }
    }
}

export default handler;