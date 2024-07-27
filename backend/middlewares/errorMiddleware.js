export class ErrorHandler extends Error{
    constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
    }
}

export const errorMiddleware=(err,req,res,next)=>{
err.statusCode=err.statusCode || 500;
err.message=err.message || "internal server error";

if(err.code=== 11000)
{
    const message="Duplicate Key Entry in Database"
    err=new ErrorHandler(message,400);
}

if(err.name=== "JsonWebTokenError")
{
    const message="JWT token is invalid"
    err=new ErrorHandler(message,400);
}

return res.status(err.statusCode).json(
    {
        success:false,
        message:err.message,
        err:err
    }
)

}