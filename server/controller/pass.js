import User from "../models/user.js";

const savePassword =async(req,res)=>{
    try{
       const response = await User.updateOne(
         { _id: req.userEmail },
         { $push: { savedPassword: req.body } }
       );
       if(response){
            res.status(200).json({ msg: "saved successfully" });
       }

    }catch(err){
        console.error(err.message);
        res.status(400).json("server errror")
    }
}

const savePasswords = async(req,res)=>{
    try{
        const data = await User.find({_id:req.userEmail}).sort();
        res.status(200).json(data);
    }catch(err){
        console.log(err)
        res.status(400).json("some thing went wrong");
    }
}

const deletePass =async (req,res)=>{
 try {

   const id = req.params.id

   User.updateOne(
     { _id: req.userEmail },
     {
       $pull: { savedPassword: { _id: id } },
     }
   )
     .then((result) => {
      res.status(200).json("deleted successfully");
     })
     .catch((error) => {
      res.status(400).json("something went wrong")
       console.error(error);
     });
 } catch (error) {
   console.error(error);
    res.status(400).json("something went wrong");
 }

}


export { savePassword, savePasswords, deletePass };