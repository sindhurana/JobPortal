import express from "express";
import { register } from "../controller/user.controller.js";


export const userRouter=express.Router();

userRouter.post("/register",register);
