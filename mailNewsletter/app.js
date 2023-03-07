const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req,res){
  console.log("in get");
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const email = req.body.email;
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/e0a9a568e6";

  const options = {
    method: "POST",
    auth: "user1:06f95414e17b323925795ad14069f9d5-us14"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      //console.log(JSON.parse(data));
    });
    console.log(response.statusCode);
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonData);
  request.end();
  console.log();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/success", function(req,res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Server is running on Port 3000");
})

//API mailChimpKey const mailChimpKey="06f95414e17b323925795ad14069f9d5-us14";
// List id  e0a9a568e6
