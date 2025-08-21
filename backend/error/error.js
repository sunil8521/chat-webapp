
export class CustomError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "server error";
    }
}


export const errorMiddleware=(err,req,res,next)=>{
res.status(err.statusCode||500).json({
    success:false,
    error:err,
    message:err.message,
    status: err.status,
    stack: err.stack,
})
} 
export const errorHandler=(func)=>{
    return (req,res,next)=>{
func(req,res,next).catch(next)
    }

}