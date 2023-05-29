const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

const API_KEY = process.env.API;

app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

const weatherData1 = {
    "temp": 23,
    "humidity": 12,
    "bar": 30,
    "gas": 4,
    "updated": getDate()
 }

const weatherData2 = {
    "temp": 12,
    "humidity": 78,
    "bar": 23,
    "gas": 8,
    "updated": getDate()
}

// GET => /api/weather ==> Connection to frontend
// res: Weather data

// POST => /api/data ==> Connection to arduino
// req: Weather data

app.get('/api/weatherLoc1', (req, res) => {
    console.log("Got Request");
    res.send(weatherData1);
});

app.get('/api/weatherLoc2', (req, res) => {
    res.json(weatherData2);
});

app.post('/api/setData1', (req, res) => {
    if(req.body.api_key === API_KEY) {
        weatherData1["temp"] = req.body.temp;
        weatherData1["humidity"] = req.body.humidity;
        weatherData1["bar"] = req.body.bar;
        weatherData1["gas"] = req.body.gas;
        weatherData1["updated"] = getDate();
        res.json('Got weather data');
    } else {
        res.json('Wrong API key')
    }
});

app.post('/api/setData2', (req, res) => {
    if(req.body.api_key === API_KEY) {
        weatherData2["temp"] = req.body.temp;
        weatherData2["humidity"] = req.body.humidity;
        weatherData2["bar"] = req.body.bar;
        weatherData2["gas"] = req.body.gas;
        weatherData2["updated"] = getDate();
        res.json('Got weather data');
    } else {
        res.json('Wrong API key')
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
});

function getDate() {
    const date = new Date();
    const timeHour = date.getHours();
    const timeMinutes = date.getMinutes();

    return `${timeHour}:${timeMinutes}`;
}