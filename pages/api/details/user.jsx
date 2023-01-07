import User from "../../../model/user";
import connectmongo from "../../../utils/connect";

const handler = async(req, res)=> {
    const { name,email,password} = req.query;  
    await connectmongo();
    const Userdata = new User({
        name: name,
        email: email,
        password: password,
    })
    const result = await User.insertMany([Userdata]);
    // console.log(result);
    res.status(200).json({ name,email,password })
  }

  export default handler;