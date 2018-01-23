const ex = require("express");
const bopas = require("body-parser");
const pass = require("passport");
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/user.js")

const bear = require("passport-http-bearer").Strategy;
const up = ex();

pass.use("lolol", new bear((token,done)=>{
    jwt.verify(token, "secretkey", (error, decoded) => {

        if (error) {
            return done("User Not Authorized", null);
        }
        else{
            return done(null, decoded);
        }

    })
}))

up
.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
})
.use(pass.initialize())
.post("/authenticate",pass.authenticate("lolol",{session:false}),(req,res)=>{
    res.send(req.user);
})
.use(bopas.json())
.use(bopas.urlencoded({extended:true}))
.use("/user",userRoute)
.listen(3000)