const colors = require('colors')

const errorMiddleware = (err,req,res,next)=>{
    const statusCode = res.statusCode===200?500:res.statusCode
    res.status(statusCode);
    res.json({message:err.message,stack:process.env.NODE_ENV==='Production'?null:err.stack})
    console.log(colors.red(err))
}

module.exports = {errorMiddleware}