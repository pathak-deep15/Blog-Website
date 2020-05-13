//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const clip = require("text-clipper");

const homeStartingContent = "Hi There. Feeling like there should be someone you need to talk to, or have an urge to become a professionsal blogger. This web application is the perfect destination of all your needs. Use it as a diary or a platform to express your views and write blogs. Do visit the Contact section to send any feedback/suggestion to me. I will be more than happy to implement the suggestions. Enjoy :) ....";
const aboutContent = "Hi, this Web application is developed by Deep Pathak. Do visit contact section to contact him.";
const contactContent = "Hi, I hope you liked the application. Send your valuable feedback/suggestions to pathakdeep203@gmail.com. Thank you for your time :) .";

const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res) {
  res.render("home", {homeContent : homeStartingContent, posts: posts});
});

app.get("/about", function(req,res) {
  res.render("about", {aboutContent : aboutContent});
});

app.get("/contact", function(req,res) {
  res.render("contact", {contactContent : contactContent});
});

app.get("/compose", function(req,res) {
  res.render("compose");
});

app.get("/posts/:postTitle" , function(req, res) {
  let postName = req.params.postTitle;
//  for (var i=0 ; i<posts.length; i++) {

  posts.forEach(function(post) {
    let reqTitle = post.title;
    if(lodash.lowerCase(reqTitle) === lodash.lowerCase(postName)) {
      res.render("post", {post: post});
    //  break;
    }
  });
});

app.post("/compose", function(req,res) {
  const clippedContent = clip(req.body.postEntry, 100);
  const post = {
    title: req.body.postTitle,
    content: req.body.postEntry,
    clippedContent: clippedContent
  };
  posts.push(post);
  res.redirect("/");
});












app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
