import User from "../../model/user";

export default async (req,res) => {

    if(req.method==="PUT"){
        
    }
    console.log("req param");
    console.log(req.query);
    const {selectedCats,id} = req.query;
    // const sen=["computer science","electrica","fvdfv","fsd"] 
    // const Id=true;
    if(id){
        console.log(selectedCats);
        User.findByIdAndUpdate(id,{categoryId:[selectedCats]},(err,doc)=>{
            if(err){
                res.status(400).json({message:"error occured"});
            }
            else{
                res.status(200).json({message:"success"});
            }
        })
    }
}