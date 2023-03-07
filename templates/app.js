//template code for node server

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res){
  //res.write("Hello");
  //res.send();
  res.sendFile(__dirname + "/index.html");
});



let port = 3000;
app.listen(port, function(){
  console.log("Server is running on port 3000");
});
