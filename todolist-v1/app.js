const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js")


const items=["wake up at 6 Am"];
const workItems=["work"];
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
let item=" ";
const day=date.getDate();

app.set("view engine","ejs");


app.get("/",function(req,res){


    res.render('list',{Headtitle:day,listItems:items});


    // res.send(__dirnmae+"/index.html");
});

app.get("/work",function(req,res){
  res.render('list',{Headtitle:"work",listItems:workItems});
});

app.get("/about",function(req,res){
  res.render('about');
});

app.post('/',function(req,res){

  if(req.body.list=='work'){
    item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
  }else{
    item=req.body.newItem;
    items.push(item);
 res.redirect("/");
  }
})


app.listen(3000,function(req,res){
 console.log("server started on port 3000");
});
