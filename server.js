import { commentRouter, cors, dbConnection, express, passport, postRouter, userRouter } from "./src/Index.js";

 const app=express()
 const port = process.env.PORT ;

app.use(cors())
app.use(express.json())
app.use(passport.initialize());

app.use(express.urlencoded({extended:true}))

app.use("/profile",express.static("./public/uploads/posts"))
app.use("/profile",express.static("./public/uploads/userProfile"))
app.use("/api/post",postRouter)
app.use("/api/comment",commentRouter)
app.use("/api/user",userRouter)


const server= app.listen(port,()=>{
    dbConnection();
    console.log("server connected at 3032",port);
})

export { server};