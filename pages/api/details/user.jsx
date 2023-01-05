import User from "../../../model/userprofile";
import connectmongo from "../../../utils/connect";

const handler = async(req, res)=> {
    const { name,email} = req.query;  
    await connectmongo();
    const Userdata = new User({
        name: name,
        email: email,
    })
    const result = await User.insertMany([Userdata]);
    console.log(result);
    res.status(200).json({ name,email })
  }

  export default handler;