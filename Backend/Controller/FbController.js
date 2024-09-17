const FaceBook=require("../Model/FbModel")

const createPost=async(req,res)=>{
    try {
        const {post,background}=req.body
        const faceBook=new FaceBook({
            post:post,
            background:background
        })
        await faceBook.save()
        return res.status(200).json(faceBook)
    } catch (error) {
        console.log("error dsfdsf")
    }
}

const FileUpload=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(404).send({message:"No File Uploaded"})
        }else{
            res.json({ message: 'File uploaded successfully', filename: req.file.filename });
        }
    } catch (error) {
        console.log("error")
    }
}
const updateFbPost=async(req,res)=>{
   try {
    const userId=req.body.id
    const {post,background} = req.body
    const updatedPost = await FaceBook.findByIdAndUpdate({_id:userId},{$set:{post:post,background:background}},{new:true})
    return res.status(200).json({message:"post sucessfully updated",updatedPost})
   } catch (error) {
    console.log("Error")
   }
}
const getPost=async(req,res)=>{
    try {
        const userId=req.params.id
        const faceBook=await FaceBook.findById({_id:userId})
        return res.status(200).json(faceBook)
    } catch (error) {
        console.log("error")
    }
}
const deletePost=async(req,res)=>{
    try { 
        const userId=req.params.id
        console.log(userId)
        await FaceBook.findByIdAndDelete({_id:userId})
        return res.status(200).json({message:"post sucessfully deletd"})
    } catch (error) {
       console.log("error") 
    }
}
const uplaodfiles=async(req,res)=>{
    try {
        res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
    } catch (error) {
        console.log("error") 
    }
}
const getAll=async(req,res)=>{
    try {
        const start=parseInt(req.query.start)|| 1;
        const limit=parseInt(req.query.limit)|| 5;
        const orderBy=parseInt(req.query.orderBy)||0
        
        const skip=(start-1)*limit
        
        const sorted=orderBy===1?{createdAt:1}:{createdAt:-1}

        let dateFilter = {};
        if (req.query.date) {
          const date = new Date(req.query.date);
          const nextDay = new Date(date);
          nextDay.setDate(date.getDate() + 1);
          dateFilter = {
            createdAt: {
              $gte: date,   
              $lt: nextDay,   
            },
          };
        }
        const posts=await FaceBook.find(dateFilter)
        .sort(sorted)
        .skip(skip)
        .limit(limit)
     return res.status(200).json({message:"All Post Get Successfully",posts})
    } catch (error) {
        console.log("error")
    }
}
module.exports={createPost,FileUpload,updateFbPost,deletePost,getPost,getAll,uplaodfiles}