import express from "express";
import { deleteJob, getAlljobs, getMyJobs, getSingleJob, postJob } from "../controller/job.controller.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";



export const jobRouter=express.Router();


jobRouter.post("/postJob",isAuthenticated,isAuthorized("Employer"),postJob);
jobRouter.get("/getAllJobs",getAlljobs);
jobRouter.get("/getMyJobs",isAuthenticated,isAuthorized("Employer"),getMyJobs);
jobRouter.delete("/deleteJob/:id",isAuthenticated,isAuthorized("Employer"),deleteJob);
jobRouter.get("/get/:id",isAuthenticated,getSingleJob);

