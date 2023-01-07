import User from "../../model/user";

export default async (req,res) => {
    const sen=["computer science","electrica","fvdfv","fsd"] 
    const Id=true;
    if(Id){
        User.findByIdAndUpdate('63b9707c094e1b6b740f7736',{categoryId:[...sen]},(err,doc)=>{
            if(err){
                res.status(400).json({message:"error occured"});
            }
            else{
                res.status(200).json({message:"success"});
            }
        })
    }
}