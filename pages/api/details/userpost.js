

const handler = async(req, res)=> {
    if(req.method === 'POST'){

        // POST DATA POSTED

        const {name,image, userId,media,url,description ,categoryIds} = req.body; 
        const Postdata = new Post({
            userId: userId,
            name:name,
            image:image,
            url: url,
            media:media,
            description: description,
            categoryId: categoryIds,
        })
        
        const result = await Post.insertMany([Postdata]);
        res.status(200).json({_id: result[0]._id});
    }

    // POST DATA FETCHED

    if(req.method==='GET' && req.query.other==='allPosts'){
        const id= req.query.id;
        try{
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const result = await Post.findById(id);
                res.status(200).json({result});
            }else{
                res.status(200).json([]);
            }
        }catch(err){
            res.status(400).json({message:err.message});
        }
    }
  }
export default handler;