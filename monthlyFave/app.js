const express = require('express');
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", function(req,res) {
  res.render("list")
});



let port = 3000;
app.listen(port, function(){
  console.log("Server started on port "+port);
});
