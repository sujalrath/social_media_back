import { addEditComment, deleteComment } from "../controller/CommentController.js";
import { Auth, express } from "../Index.js";

const commentRouter=express.Router()

commentRouter.post("/create-comment",Auth,addEditComment)
commentRouter.post("/delete-comment",Auth,deleteComment)

export default commentRouter