const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")
const bodyparser=require("body-parser")
require('dotenv').config();
app.use(express.json())


const user={
    name:"himath",
    password:"1234"
}


app.post("/login",(req,res)=>{

    const username=req.body.username
    const password=req.body.password

    if(username == user.name && password==user.password){
        const token=jwt.sign({name:user.name},process.env.serect_key)
        res.json({jwttoken:token})
    }
    else{
        res.json({message:"invalid username or password"})
    }
})


app.get("/profile",(req,res)=>{

    const authheader=req.headers["authorization"]
    const token=authheader && authheader.split(" ")[1]

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







app.listen(3000)