
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    const cityName=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=1731de5668215eab269e0d2e6bf68227&units=metric";

    https.get( url , function(response){

        response.on("data", function(data){

        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const des = weatherData.weather[0].description;
        const icon =weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"

        res.write("<h1>The Current Temperature in "+ cityName +" is "+ temp + " degrees celsius.</h1>")
        res.write("<p>The weather conditions are " + des + "</p>")
        res.write("<img src="+ imageURL+">");
        res.send();
        })
    })
})

app.listen(3000 , function(){
    console.log("Server is running at port 3000!");
})
