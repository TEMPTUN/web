import Post from "../../../model/post";

const handler = async(req, res)=> {
    if(req.method === 'POST'){
        const { userId,media,url,description ,categoryIds} = req.body; 
        const Postdata = new Post({
            userId: userId,
            url: url,
            media:media,
            description: description,
            categoryId: categoryIds,
        })
        
        const result = await Post.insertMany([Postdata]);
        res.status(200).json({_id: result[0]._id});
    }
  }

export default handler;