const mongoose =require("mongoose")

const FaceSchema=new mongoose.Schema({
    post:{type:String,required:true},
    background:{type:String,require:true},
},{timestamps:true})
const FaceBook=mongoose.model("FaceBook",FaceSchema)

module.exports=FaceBook;