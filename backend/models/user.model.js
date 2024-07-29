import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken"


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
        select:false
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

userSchema.methods.getJWTToken=function (){
return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
}

export const User=mongoose.model("User",userSchema);