import { User } from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken"

export const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("User is not authenticated",400));
    }

    const payload=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(payload.id);

    next();
})