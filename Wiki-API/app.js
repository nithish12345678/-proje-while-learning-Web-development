
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO



//database
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/wikiDB");

const articleSchema={
   title:String,
   content:String
};

const Article=mongoose.model("article",articleSchema);


app.route("/articles")
.get(function(req,res){

    Article.find({},function(err,article){
        // console.log(article);
        res.send(article);
    });

})

.post(function(req,res){

    const article=new Article({
        title:req.body.title,
        content:req.body.content
    });
    article.save(function(err){
        if(!err){
            res.send("succesfully added");
        }
        else{
            res.send(err);
        }
    });
    // console.log(req.body.title);
    // console.log( req.body.content);
})

.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("succesfully deleted");
        }
        else{
            res.send(err);
        }
    });
});


// app.get("/articles",);


// app.post("/articles",);

// app.delete("/articles",);



app.route("/articles/:articleTitle")
.get(function(req,res){
Title= req.params.articleTitle;

Article.findOne({title:Title},function(err,foundArticle){
    if(foundArticle){
        res.send(foundArticle);
    }
   else{
    console.log("No  match");
   }
});

})

.put(function(req,res){
    Article.updateOne({title:req.params.articleTitle},{
        title:req.body.title,
        content:req.body.content},function(err){
            if(!err){
                res.send("successfully updated");
            }
            else{
                console.log(err);
            }
        });
}
)
.patch(function(req,res){
    Article.updateOne({title:req.params.articleTitle},{$set:req.body},function(err){
            if(!err){
                res.send("successfully updated");
            }
            else{
                console.log(err);
            }
        });
}
)


.delete(function(req,res){
    Article.deleteOne({title:req.params.articleTitle},function(err){
        if(!err){
            res.send("succesfully deleted");
        }
        else{
            res.send(err);
        }
    });
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  
  