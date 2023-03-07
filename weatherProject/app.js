const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req,res){
  console.log(req.body.city);

  const city = req.body.city
  const apiKey = "535db256f910e4bf5965193b099d1b8b"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      //JSON.stringify(weatherData)
      const temp = weatherData.main.temp;
      const descr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>"+city+" has a current temperature of " + temp + " degrees</h1>");
      res.write("</br> The weather in "+city+" is " + descr);
      res.write("</br><img src=" + imgURL + ">");

      res.end();
    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on Port 3000");
});

//
//
