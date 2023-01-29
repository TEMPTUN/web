import Discussion from "../../../model/discussion";

export default async function handler(req,res){
    if(req.method === "POST"){

        // DISCUSSION CREATED

        const {userId,name,image,title,description,category} = req.body;
        try {
            const newDiscussion = new Discussion({
                userId,
                name,
                image,
                title,
                description,
                category
            });
            const result=await Discussion.insertMany([newDiscussion]);
            res.status(200).json(result[0].id);
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }
    if(req.method === "GET"){

        // DISCUSSION FETCHED BY USER ID

        const {id} = req.query;
        try {
            const result = await Discussion.findById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }
}   