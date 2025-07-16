const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")
const bodyparser=require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();
app.use(express.json())
app.use(cookieParser())


const user={
    name:"himath",
    password:"1234"
}


app.post("/login",(req,res)=>{

    const username=req.body.username
    const password=req.body.password

    if(username == user.name && password==user.password){
        const token=jwt.sign({name:user.name},process.env.serect_key)
        
        res.cookie("authcookie",token,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:60*60*1000
        })

        res.json({jwttoken:token})
    }
    else{
        res.json({message:"invalid username or password"})
    }
})


app.get("/dashboard",(req,res)=>{

    const token=req.cookies.authcookie

    if(!token){ 
        return res.json({message:"token missing"})
    }

    jwt.verify(token,process.env.serect_key,(error,value)=>{
        if(error){
            return res.json({message:"invlaid user"})
        }

        res.json({message:"welcome to your profile",value})

    })

})


app.post("/logout",(req,res)=>{
    res.clearCookie("authcookie",{
        httpOnly:true,
        sameSite:"strict",
        secure:false
    })
    res.json({message:"logged out"})

})


app.listen(3000)