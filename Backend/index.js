const ex = require("express");
const bopas = require("body-parser");
const pass = require("passport");
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/user.js")

const bear = require("passport-http-bearer").Strategy;
const up = ex();

pass.use("lolol", new bear((token,done)=>{
    if (error) {
        return done("User Not Authorized", null);
    }
    else{
        return done(null, decoded);
    }
}))

up
.use(pass.initialize())
.use("/authenticate",pass.authenticate("lolol",{session:false}),(req,res)=>{
    res.send(req.user);
})
.use(bopas.json())
.use(bopas.urlencoded({extended:true}))
.use("/user",userRoute)
.listen(3000)