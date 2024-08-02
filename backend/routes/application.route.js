import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { deleteApplication, employerGetAllApplication, jobSeekerGetAllApplication, postApplication } from "../controller/application.controller.js";

const applicationRouter=express.Router();

applicationRouter.post("/post/:id",isAuthenticated,isAuthorized("Job Seeker"),postApplication);

applicationRouter.get("/employer/getAll",isAuthenticated,isAuthorized("Employer"),employerGetAllApplication);

applicationRouter.get("/jobseeker/getAll",isAuthenticated,isAuthorized("Job Seeker"),jobSeekerGetAllApplication);

applicationRouter.delete("/delete/:id",isAuthenticated,deleteApplication);

export default applicationRouter;