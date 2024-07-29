import express from "express";
import { getUser, login, logout, register, updatePassword, updateProfile } from "../controller/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";


export const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",isAuthenticated,logout);
userRouter.get("/getUser",isAuthenticated,getUser);
userRouter.put("/update/profile",isAuthenticated,updateProfile);
userRouter.put("/update/password",isAuthenticated,updatePassword);
