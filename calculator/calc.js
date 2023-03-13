
//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const app=express();

app.get("/",function(req,res){
  res.sendFile(__dirname+"/calc.html");
});
app.get("/bmicalculator",function(req,res){
  res.sendFile(__dirname+"/bmicalc.html");
});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
  var n1=Number(req.body.num1);
  var n2=Number(req.body.num2);
  var sum=n1 + n2;
  res.send("Sum of two numbers ="+sum);

});
app.post("/bmicalculator",function(req,res){
  var n1=Number(req.body.weight);
  var h=Number(req.body.height);
  var b=n1/(h*h);
  res.send("your BMI is: ="+b);

});

app.listen(8080,function(){
  console.log("server started on port 8080");
});
