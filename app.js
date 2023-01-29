const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

//express libary included



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


//basic http methods are used over here
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {

    // console.log(req.body.cityName)
    const query = req.body.cityName;
    const apiKey = "a3f38c664d075620651361703170c94b#"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&unit=" + unit + "&appid=" + apiKey;

    https.get(url, function (response) {
        // console.log(response);

        response.on("data", function (data) {
            // to print in preety JSON
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(desc);

            res.write("<H1>It is very " + desc + " weather</h1>");
            res.write("The temp is " + temp)
            res.write("<img src=" + imageURL + ">");

            res.send();
        })
    })
})

app.listen(4000, function () {
    console.log("Server is running on port 3000");
})

