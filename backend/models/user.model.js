import mongoose from "mongoose";
import { validate } from "node-cron";
import validator from "validator";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Name must hav atleast 3 characters"],
        maxLength:[30,"Name should not be more than 30 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter valid email"]
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    niches:{
        firstNiche:String,
        secondNiche:String,
        thirdNiche:String
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password must be 8 characters."],
        
    },
    resume:{
        public_id:String,
        url:String
    },
    coverLetter:{
        type:String
    },
    role:{
        type:String,
        enum:["Job Seeker","Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const User=mongoose.model("User",userSchema);