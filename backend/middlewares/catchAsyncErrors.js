export const catchAsyncErrors=(requiredFunction)=>{
return (req,res,next)=>{
    Promise.resolve(requiredFunction(req,res,next)).catch(next);
}
}