import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import {v2 as cloudinary} from "cloudinary"
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt"


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
                        
                        // console.log(resume.tempFilePath)
                        
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
        
        const hashedPassword=await bcrypt.hash(password,12);
        userData.password=hashedPassword;
            
  const user=await User.create(userData);
  sendToken(user,201,res,"User Registered Successfully")

//   res.status(201).json({
//     success:true,
//     message:"User Registered Successfully"
//   })
            
        
      

    } catch (error) {
        next(error);
    }
})

export const login=catchAsyncErrors(async(req,res,next)=>{
const {role,email,password}=req.body;

if(!role|| !email || !password){
   return next(new ErrorHandler("Role,email & password are required",400))
}

const user=await User.findOne({email}).select("+password");

if(!user){
    return next(new ErrorHandler("User doesnot exist",400))
}

const isPasswordMatching=await bcrypt.compare(password,user.password);

if(!isPasswordMatching){
    return next(new ErrorHandler("Incorrect email or password",400))
}

if(user.role!==role){
    return next(new ErrorHandler("Incorrect role selected",400))
}

sendToken(user,200,res,"User Logged in")

})

export const logout=catchAsyncErrors((req,res,next)=>{
res.status(200).cookie("token","",{
    expires:new Date(Date.now()),
    httpOnly:true
        }).json({
    success:true,
    message:"Logged out"
})
})

export const getUser=catchAsyncErrors(async(req,res,next)=>{
const user=req.user;
res.status(200).json({
    success:true,
    user
})
})

export const updateProfile=catchAsyncErrors(async(req,res,next)=>{

const newUserData={
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    address:req.body.address,
    coverLetter:req.body.coverLetter,
    niches:{
        firstNiche:req.body.firstNiche,
        secondNiche:req.body.secondNiche,
        thirdNiche:req.body.thirdNiche
    }
}

const {firstNiche,secondNiche,thirdNiche}=newUserData.niches;

if(req.user.role=== "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)){
    return next(new ErrorHandler("Please provide all niches",400));
}

if(req.files){
    const resume=req.files.resume;

    if(resume){
        const currentResumeId=req.user.resume.public_id;

        if(currentResumeId){
            await cloudinary.uploader.destroy(currentResumeId);
        }

        const newResume=await cloudinary.uploader.upload(resume.tempFilePath,{folder:"Job_Seeker_Resumes"});

        newUserData.resume={
           public_id:newResume.public_id,
           url:newResume.secure_url
        }
    }

}

const user=await User.findByIdAndUpdate(req.user.id,newUserData,{

    new:true,
    runValidators:true,
    usefindAndModify:false
});

res.status(200).json({
    success:true,
    user,
    message:"Profile has been updated."
})

})

export const updatePassword=catchAsyncErrors(async(req,res,next)=>{

    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatching=await bcrypt.compare(req.body.oldPassword,user.password);

    if(!isPasswordMatching){
        return next (new ErrorHandler("Old password is incorrct.",400));
    }


    if(req.body.newPassword!== req.body.confirmPassword ){
        return next (new ErrorHandler("New password & confirm password does not match.",400));
    }

    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res,"Password updated succesfully")

})