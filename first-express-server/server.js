

const express = require("express");
const app = express();

app.get("/", function(request, response){
  response.send("home route");
});

app.get("/contact", function(req, res){
  res.send("Please do not contact me!!");
});

app.get("/about", function(req, res){
  res.send("<em> I am a ZOOOOO </em>");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
