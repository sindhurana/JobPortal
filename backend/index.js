import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./database/db.js";
import { config } from "dotenv"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload";
import { userRouter } from "./routes/user.route.js";
import { jobRouter } from "./routes/job.route.js";

config();


const app= express();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}
))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/user",userRouter);
app.use("/api/job",jobRouter);


app.listen(4000,()=>{
    console.log(`Server listening at PORT 4000`)
    connectToMongoDB();
})

app.use(errorMiddleware);