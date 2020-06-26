const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const appid = "9217c791a28567c74f541d2ee73f4b1f";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + appid + "&units=" + units;
    https.get(url, function(response){

        // console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius</h1>");
            res.write("<p>Weather Description : " + weatherDescription + "</p>");
            res.write("<img src = "+ imgURL +">")

            res.send();
        });
    });
});

app.listen(3000, function(req,res){
    console.log("Server is running on port 3000");
});