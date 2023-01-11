import Post from "../../../model/post";

const handler = async(req, res)=> {
    if(req.method === 'POST'){
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
        console.log("----------------------result of postId-------------------");
        console.log(result[0]._id);
    
        res.status(200).json({_id: result[0]._id});
    }
  }

export default handler;