import User from "../../../model/user";
import connectmongo from "../../../utils/connect";

const handler = async(req, res)=> {
    const { name,email,password} = req.query; 
    await connectmongo();
    const Userdata = new User({
        name: name,
        email: email,
        password: password
    })
    const result = await User.insertMany([Userdata]);
    // console.log(result); ,{$push:{categoryId:sen}}
    res.status(200).json({ id:result[0]._id })
  }

  export default handler;