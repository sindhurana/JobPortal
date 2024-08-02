import { application } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/Job.model.js";
import {v2 as cloudinary} from "cloudinary"


export const postApplication=catchAsyncErrors(async(req,res,next)=>{
const {id}=req.params;
const {name,email,phone,address,coverLetter}=req.body;


if(!name||!email||!phone||!address||!coverLetter){
    return next(new ErrorHandler("All fields are required for job application.",400))
}



const jobSeekerInfo={
    id:req.user._id,
    name,
    email,
    phone,
    address,
    coverLetter,
    role:"Job Seeker"
}

const jobDetails=await Job.findById(id);

if(!jobDetails){
    return next(new ErrorHandler("Job not found.",404))
}
const employerInfo={
    id:jobDetails.postedBy,
    role:"Employer"
}

const jobInfo={
    jobId:id,
    jobTitle:jobDetails.title
}

const hasAlreadyApplied=await Application.findOne({
    "jobInfo.jobId":id,
    "jobSeekerInfo.id":req.user._id
})

if(hasAlreadyApplied){
    return next(new ErrorHandler("You have already applied for ths job.",400))
}

if(req.files && req.files.resume){
    const {resume}=req.files;
    try {
        const responseFromCloudinary=await cloudinary.uploader.upload(resume.tempFilePath,{
            folder:"Job_Seeker_Resumes"
        })        

        if(!responseFromCloudinary || responseFromCloudinary.error){
            return next(new ErrorHandler("Failed to upload resume on cloudinary",500))
        }

        jobSeekerInfo.resume={
            public_id:responseFromCloudinary.public_id,
            url:responseFromCloudinary.secure_url
        }
    } catch (error) {
        return next(new ErrorHandler("Failed to upload resume.",500))
    }
}
else{
    if(req.user && !req.user.resume.url){
        return next(new ErrorHandler("Please upload your resume.",400))
    }
    jobSeekerInfo.resume={
        public_id:req.user.resume.public_id,
        url:req.user.resume.url
    }
}



const application=await Application.create({
  jobSeekerInfo,employerInfo,jobInfo
})

res.status(201).json({
    success:true,
    message:"Aplication Submitted",
    application
})

})

export const employerGetAllApplication=catchAsyncErrors(async(req,res,next)=>{
const id=req.user._id;

const applications=await Application.find({
    "employerInfo.id":id,
    "deletedBy.employer":false
})

res.status(200).json({
    success:true,
    applications
})

})

export const jobSeekerGetAllApplication=catchAsyncErrors(async(req,res,next)=>{
    const id=req.user._id;

    const applications=await Application.find({
        "jobSeekerInfo.id":id,
        "deletedBy.jobSeeker":false
    })
    
    res.status(200).json({
        success:true,
        applications
    })

})

export const deleteApplication=catchAsyncErrors(async(req,res,next)=>{
const {id}=req.params;
const application=await Application.findById(id);

if(!application){
return next(new ErrorHandler("Application not found",404));
}

const {role}=req.user;

switch (role) {
    case "Job Seeker":
        application.deletedBy.jobSeeker=true;
        await application.save()
        break;

    case "Employer":
        application.deletedBy.employer=true;
        await application.save()
        break;

    default:
        break;
}

if(application.deletedBy.employer===true && application.deletedBy.jobSeeker===true){
    await application.deleteOne({_id:id});
}

res.status(200).json({
    success:true,
    message:"Application Deleted"
})

})