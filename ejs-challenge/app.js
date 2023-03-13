//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const  _ =require("lodash");
const ejs = require("ejs");
let posts=[];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





//database
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/blogpostDB");

const postSchema={
  title:String,
  content:String
};
const post=mongoose.model("post",postSchema);
//server

app.get('/', (req, res) => {


  post.find({},function(err,foundPost){
    posts=foundPost;
    console.log(posts);

  });
  res.render("home",{par:homeStartingContent,posts:posts});
  res.redirect("/");
})


app.get('/about', (req, res) => {

  res.render("about",{par:aboutContent});
})

app.get('/contact', (req, res) => {

  res.render("contact",{par:contactContent});
})


app.get('/compose', (req, res) => {

  res.render("compose");
  console.log(req.body.txt);
})
app.get('/post/:postId', (req, res) => {
  // const requestedPostId = req.params.postId;

  // console.log(posts );
  // console.log(req.params.postId );
  // post.findOne({_id: requestedPostId}, function(err,post){
  //   res.render("post",{
  //     title:post.title,
  //     content:post.content
  //   });
  // });

  posts.forEach(function(post){
     const storedTitle=post.title;
     const storedContent=post.content;
     console.log(post._id+" "+req.params.postId  );
     if (_.lowerCase(post._id) ===_.lowerCase(req.params.postId)  ) {
      res.render("post",{title:storedTitle,content:storedContent});
      console.log(storedTitle);
    }
    else{
      console.log("not found");
      }

  });

//   posts.forEach(function(post){
//     const storedTitle=post.title;
//     const storedContent=post.content;
//     if (_.lowerCase(storedTitle) ===_.lowerCase(req.params.postName) ) {
//      res.render("post",{title:storedTitle,content:storedContent});
//      console.log(storedTitle);
//    }
//    else{
//      console.log("not found");
//      }

//  });
})


app.post('/compose', (req, res) => {

  const post1=new post({
   title:req.body.posttitle,
   content:req.body.postcontent
  });
  post1.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
