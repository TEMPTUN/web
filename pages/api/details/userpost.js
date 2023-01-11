import Post from "../../../model/post";

const handler = async(req, res)=> {
    if(req.method === 'POST'){
        const { userId,image,video,url,description } = req.body; 
        const Postdata = new Post({
            userId: userId,
            url: url,
            image: image,
            video: video,
            description: description,
        })
        const result = await Post.insertMany([Postdata]);
        res.status(200).json({ id:result[0]._id});
    }
  }

export default handler;