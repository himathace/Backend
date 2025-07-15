const express=require("express")
const app=express()
app.use(express.json())


const user={
    name:"himath",
    password:"1234"
}

app.get("/pages",(req,res)=>{
    res.json({message:"hello"})
})

app.post("/login",(req,res)=>{

    const username=req.body.username
    const password=req.body.password

    if(username == user.name && password==user.password){
        res.json({message:"welcome"})
    }
    else{
        res.json({message:"invalid username or password"})
    }
})







app.listen(3000)