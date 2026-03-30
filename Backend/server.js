const express=require("express")
const userRouter=require("./Routes/User.js")
const { ConnectToDatabase } = require("./Config/connect.js")
const app=express()
const port =8001


ConnectToDatabase();
app.use(express.urlencoded({ extended: false })); 
app.use(express.static("Public"));
app.use(express.json())

app.use("/",userRouter)

app.listen(port,()=>{
    console.log("Listening on port",port)
})