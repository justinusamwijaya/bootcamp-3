const mon = require("mongoose");

mon.connect("mongodb://localhost:27017/databesh",{useMongoClient:true})

const sch = mon.Schema

const usersc = new sch({
    Name:String,
    Email:String,
    Password:String,
})

const user = mon.model("user",usersc)

module.exports = user;