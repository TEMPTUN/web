import Group from '../../../model/group';

const handler = async(req, res)=> {
    if(req.method==='POST'){

        // GROUP CREATED

        try{
            const {userId,name,image,title,about,Compensation,description,company,category} = req.body;
            const groupData = new Group({
                userId,name,image,title,about,description,company,category,Compensation
            });
            const result = await Group.insertMany([groupData]);
            res.status(200).json({ message:"User connected Succesfully",id:result[0]._id});
        }catch(err){
            res.status(400).json({message:err.message});
        }
       
    }
}
export default handler;