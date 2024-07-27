import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import {v2 as cloudinary} from "cloudinary"
import { User } from "../models/user.model.js";


export const register=catchAsyncErrors(async(req,res,next)=>{

    try {
        const {name,email,phone,address,password,role,firstNiche,secondNiche,thirdNiche,coverLetter}=req.body;
        
        if(!name || !email || !phone || !address || !password || !role){
            return next(new ErrorHandler("All fields are required",400));
        }

        if(role=== "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)){
            return next(new ErrorHandler("Please provide your preferred job niche",400))
        }

      

        const existingUser=await User.findOne({email});

        if(existingUser){
            return next(new ErrorHandler("email is already registered",400))
        }

        const userData={
            name,email,phone,address,password,role,
           niches: {firstNiche,secondNiche,thirdNiche},
            coverLetter
        }

        

        if(req.files && req.files.resume){
            const {resume}=req.files;
            if(resume){
                try {
                    const responseFromCloudinary=await cloudinary.uploader.upload(resume.tempFilePath,
                        {folder:"Job_Seeker_Resumes"});
                        
                        console.log(resume.tempFilePath)
                        
                        if(!responseFromCloudinary || responseFromCloudinary.error){
                            
                            return next(new ErrorHandler("Failed to upload resume to cloud",500))
                        }
                        userData.resume={
                            public_id:responseFromCloudinary.public_id,
                            url:responseFromCloudinary.secure_url
                        }
                } catch (error) {
                    
                    return next(new ErrorHandler("failed to upload resume",500));
                }
            }
        }
        try {
            
  const user=await User.create(userData);

  res.status(201).json({
    success:true,
    message:"User Registered Successfully"
  })
            
        } catch (error) {
            consoloe.log(error)
        }

        

    } catch (error) {
        next(error);
    }
})