const ex = require("express");
const user = require("../models/user.js");
const jwt = require("jsonwebtoken");

const roo= ex.Router();

roo
.post("/signup",(req,res)=>{
    let newuser = new user({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password,
    })
    newuser.save((error) => {
        if (error) {
            res.status(500).send(error);
        }
        else{
            res.json(newuser);
        }
    })
})
.post("/login",(req,res)=>{
    if(req.body.howlong=true){
        user.findOne({Name:req.body.Name,Password:req.body.Password},(error,result)=>{
            if(error) res.send(error);
            else if(!result) res.status(404).json({ message : "User not found !"});
            else {
                const payload = {
                    id : result._id,
                    name : result.Name,
                    email : result.Email
                };
                const token = jwt.sign(payload, "secretkey");    
                res.json({ token : token,
                            username: payload,
                        });
            }
        })
    }else{
        user.findOne({Name:req.body.Name,Password:req.body.Password},(error,result)=>{
            if(error) res.send(error);
            else if(!result) res.status(404).json({ message : "User not found !"});
            else {
                const payload = {
                    id : result._id,
                    name : result.Name,
                    email : result.Email
                };
                const token = jwt.sign(payload, "secretkey", { expiresIn : 1000 });    
                res.json({ token : token,
                            username: payload,
                        });
            }
        })
    }
})
.post("/loginemail",(req,res)=>{
    if(req.body.howlong=true){
        user.findOne({Email:req.body.Name,Password:req.body.Password},(error,result)=>{
            if(error) res.send(error);
            else if(!result) res.status(404).json({ message : "User not found !"});
            else {
                const payload = {
                    id : result._id,
                    name : result.Name,
                    email : result.Email
                };
                const token = jwt.sign(payload, "secretkey");    
                res.json({ token : token,
                            username: payload,
                        });
            }
        })
    }else{
        user.findOne({Email:req.body.Name,Password:req.body.Password},(error,result)=>{
            if(error) res.send(error);
            else if(!result) res.status(404).json({ message : "User not found !"});
            else {
                const payload = {
                    id : result._id,
                    name : result.Name,
                    email : result.Email
                };
                const token = jwt.sign(payload, "secretkey", { expiresIn : 1000 });    
                res.json({ token : token,
                            username: payload,
                        });
            }
        })
    }
})

module.exports=(function(){
    return roo
})();