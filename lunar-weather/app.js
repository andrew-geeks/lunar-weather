const express=require("express");
const body_parser=require("body-parser");

const app=express();

app.set("view engine","ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.static("public"));

app.get("/",(req,res)=>{
    var today=new Date();
    var Day="Monday";
    res.render("index");
    console.log(req.body.name);
})

app.post("/",(req,res)=>{
    console.log(req.body.name);
})
app.listen(3000,()=>{
    console.log("running @ 3000");
})