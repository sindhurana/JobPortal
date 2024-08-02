import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { Job } from "../models/Job.model.js";


export const postJob=catchAsyncErrors(async(req,res,next)=>{
 const {
    title,
    jobType,
    location,
    companyName,
    introduction,responsibilities,
    qualifications,offers,salary,hiringMultipleCandidates,personalWebsiteTitle,personalWebsiteUrl,jobNiche}=req.body;

 if( !title||
    !jobType||
    !location||
    !companyName||
    !introduction||!responsibilities||!qualifications||!salary||!jobNiche){
     return next(new ErrorHandler("All fields are required for Job Posting",400));
    }

    if((personalWebsiteTitle && !personalWebsiteUrl) || (personalWebsiteUrl && !personalWebsiteTitle)){
        
        return next(new ErrorHandler("Provide both Url & title or leave both blank",400));
    }

    const postedBy=req.user._id;

    const job=await Job.create({
        title,
    jobType,
    location,
    companyName,
    introduction,responsibilities,
    qualifications,offers,salary,hiringMultipleCandidates,personalWebsite:{
        title:personalWebsiteTitle,url:personalWebsiteUrl},jobNiche,postedBy
    })

    res.status(201).json({
        success:true,
        message:"Job Posted Successfully",
        job
    })

})

export const getAlljobs=catchAsyncErrors(async(req,res,next)=>{
  const {location,jobNiche,searchKeyWord}=req.query;
  const query={};

  if(location){
    query.location=location;
  }

  if(jobNiche){
    query.jobNiche=jobNiche;
  }

  if(searchKeyWord){
    query.$or=[
        {title:{$regex:searchKeyWord,$options:"i"}},
        {companyName:{$regex:searchKeyWord, $options:"i"}},
        {introduction:{$regex:searchKeyWord,$options:"i"}}
    ]
  }

  const jobs=await Job.find(query);
  res.status(200).json({
    success:true,
    jobs,
    count:jobs.length
  })
  
})

export const getMyJobs=catchAsyncErrors(async(req,res,next)=>{
    const myJobs=await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myJobs
    })


})
export const deleteJob=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const job=await Job.findById(id);

    if(!job){
      return next(new ErrorHandler("Oops Job not found!",404));
    }

    await Job.deleteOne({_id:id});

    res.status(200).json({
        success:true,
        message:"Job deleted"
    })
})

export const getSingleJob=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const job=await Job.findById(id);

    if(!job){
      return next(new ErrorHandler("Oops Job not found!",404));
    }

    res.status(200).json({
        success:true,
        job
    })


})


