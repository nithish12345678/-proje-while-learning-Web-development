const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
 res.sendFile(__dirname+"/signup.html");
});








app.post("/",function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    // console.log(email);
    // res.send(email);
    url="www.ibavbvbpqiuvbiqub"
    const request=https.request(url,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }


        response.on("data",function(data){
            console.log("o bhai o bhai!")
        });
    });







    
});


app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(3000,function () {
    console.log("server started on port 3000");
 });