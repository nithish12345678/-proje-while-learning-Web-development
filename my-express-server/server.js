const express=require("express");
const app=express();
app.get("/",function(req,res){
    res.send("hello");
});
app.get("/about",function(req,res){
    res.send("about:evadra nuvvu jaffa nikenduku na gurinchi");
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
res.sent("Post successfully");
});
app.listen(8080,function(){
    console.log("server started at port 8080");
});