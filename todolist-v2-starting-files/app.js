//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// database
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/todolistDB")

const itemsSchema={
  name:String
};
const Item=mongoose.model("Item",itemsSchema);


const item1=new Item({
name:"Welcome to todoList"
});
const item2=new Item({
  name:"hit the + button to add a new item"
});

const defaultItem=[item1,item2];


const listsSchema={
  name:String,
  items:[itemsSchema]
};
const list=mongoose.model("List",listsSchema);


app.get("/", function(req, res) {
  const day = date.getDate();
  Item.find({}, function(err, item){
    if(item.length==0){
      Item.insertMany(defaultItem, function(err){
        if(err){
       console.log(err);
        }
         });
         res.redirect("/");
    }
    else{
      res.render("list", {listTitle: day, newListItems: item});
    }

    // console.log(item);
  })


});

app.get("/:paraName",function(req,res){


  list.findOne({name:req.params.paraName},function(err,found){
    if(!err){
      if(!found){
        const list1=new list({
          name:req.params.paraName,
          items:defaultItem
        });
        list1.save();
        res.redirect("/"+req.params.paraName);
      }
      else{
        res.render("list", {listTitle: found.name, newListItems: found.items});
      }
    }
  });
  console.log(req.params.paraName);


});



app.post("/", function(req, res){
  const day = date.getDate();
  const itemName = req.body.newItem;
  const listName= req.body.list;
  const item=new Item({name:itemName});
  if(listName===day){
   
    item.save();
    res.redirect("/");
  }
  else{
    list.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });

  }

});

app.post("/delete", function(req, res){

  const checkedItemId = req.body.checkbox;
  const listName = req.body.title;
  const itemName=req.body.itemN;
  const day = date.getDate();

  if(listName===day){
    Item.findByIdAndRemove(checkedItemId, function(err){if(err)console.log(err);});
    res.redirect("/");
  }
  else{
    list.findOne({name:listName},function(err,foundList){
      foundList.items.pop(itemName);
      foundList.save();
      res.redirect("/"+listName);
    });
  }
});



app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
