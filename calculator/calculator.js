const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){
  //res.send("success");
  //console.log(req.body);
  let sum = Number(req.body.num1) + Number(req.body.num2);
  res.send("Congrats your sum is: "+ sum);
});

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res){
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);
  res.send("Your bmi is: " + weight/(height**2))

});

app.listen(3000,function(){
});
