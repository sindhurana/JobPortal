import mongoose from "mongoose"


export const connectToMongoDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("connected to MongoDb")})
    .catch(err=>console.log(err))
}