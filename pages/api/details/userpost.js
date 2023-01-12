import Post from "../../../model/post";

const handler = async(req, res)=> {
    if(req.method === 'POST'){
        try{
            const { userId,image,video,url,description ,categoryIds} = req.body; 
            const Postdata = new Post({
                userId: userId,
                url: url,
                image: image,
                video: video,
                description: description,
                categoryId: categoryIds,
            })
            const result = await Post.insertMany([Postdata]);
            res.status(200).json({_id: result[0]._id,message:"User posted Succesfully"});
        }catch{
            res.status(400).json({message: "error occured"});
        }
    }
  }
export default handler;