const express=require("express")
const router=express.Router()
const { handleSignup, handleLogin } = require("../Controller/User")

router.post("/signup",handleSignup)
router.post("/login",handleLogin)
router.get("/",(req,res)=>{
    return res.json("nigga")
})

module.exports=router