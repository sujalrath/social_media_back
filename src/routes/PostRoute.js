import { addEditPost, deletePost, getAllPost, getSinglePost } from "../controller/PostController.js";
import { Auth, express, FileUpload } from "../Index.js";

const postRouter=express.Router()
postRouter.get("/get-all-posts",Auth,getAllPost)
postRouter.get("/get-single-post/:id",Auth,getSinglePost)
postRouter.post("/create-post",Auth,FileUpload, addEditPost)
postRouter.post("/delete-post", Auth,deletePost)

export default postRouter