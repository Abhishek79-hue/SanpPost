const FbController=require("../Controller/FbController")
const Upload=require("../Middleware/multerMiddleWare")
const express=require("express")
const Router=express()

Router.route("/post").post(FbController.createPost)
Router.route("/uplaod/image").post(Upload.single("background"),FbController.FileUpload)
Router.route("/post/update").put(FbController.updateFbPost)
Router.route("/post/:id").get(FbController.getPost)
Router.route("/get/post").get(FbController.getAll)
Router.route("/post/delete/:id").delete(FbController.deletePost)
Router.route("/upload/:filename").post(FbController.uplaodfiles)

module.exports=Router;