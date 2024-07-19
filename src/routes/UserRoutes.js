


import { getAllNotifications } from "../controller/NotificationController.js";
import { editProfile, getAllUser, registerUser, userLogin } from "../controller/UserController.js";
import { Auth, express, FileUpload } from "../Index.js";

const userRouter=express.Router()

userRouter.post('/register', registerUser);
userRouter.post("/user-login", userLogin)
userRouter.get('/get-all-users', Auth,getAllUser);
userRouter.post("/get-all-notifications",Auth,getAllNotifications)
userRouter.post('/edit-profile',Auth,FileUpload, editProfile)

export default userRouter

