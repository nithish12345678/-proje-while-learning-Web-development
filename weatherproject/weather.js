//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const https= require("https");
const app= express();


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});


app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
 var c=req.body.city;
 
 const url="https://api.openweathermap.org/data/2.5/weather?q="+c+"&limit=5&appid=3aaf9e3f23a9022600a27933fc36a554&units=metric";
 https.get(url,function(response){
    console.log(response);

    response.on("data",function(data){
     const weatherData= JSON.parse(data);
     var temp=weatherData.main.temp;
     var desc=weatherData.weather[0].description;
     console.log(temp);
     var src="http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon+"@2x.png";
     res.write("<p>Description:"+desc+"</p>");
     res.write("<h1>temperature:"+temp+"</h1>");
     res.write("<img src="+ src+">");
     res.send();
    });
  });

});


app.listen(8000,function(){

  console.log("server started");
});
