const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

const API_KEY = process.env.API;

app.use(bodyParser.json());
app.use(cors());

const weatherData = {
    weatherLoc1: [
        {
            temp: 23,
            humidity: 12,
            bar: 30,
            gas: 4
        }
    ],
    weatherLoc2: [
        {
            temp: 12,
            humidity: 78,
            bar: 23,
            gas: 8
        }
    ],
}

// GET => /api/weather ==> Connection to frontend
// res: Weather data

// POST => /api/data ==> Connection to arduino
// req: Weather data

app.get('/api/weatherLoc1', (req, res) => {
    res.send(weatherData.weatherLoc1);
});

app.get('/api/weatherLoc2', (req, res) => {
    res.json(weatherData.weatherLoc2);
});

app.post('/api/setData1', (req, res) => {
    if(req.body.api_key === API_KEY) {
        weatherData.weatherLoc1[0] = req.body.temp;
        weatherData.weatherLoc1[1] = req.body.humidity;
        weatherData.weatherLoc1[2] = req.body.bar;
        weatherData.weatherLoc1[3] = req.body.gas;
        res.json('Got weather data');
    } else {
        res.json('Wrong API key')
    }
});

app.post('/api/setData2', (req, res) => {
    if(req.body.api_key === API_KEY) {
        weatherData.weatherLoc2[0] = req.body.temp;
        weatherData.weatherLoc2[1] = req.body.humidity;
        weatherData.weatherLoc2[2] = req.body.bar;
        weatherData.weatherLoc2[3] = req.body.gas;
        res.json('Got weather data');
    } else {
        res.json('Wrong API key')
    }
});

app.listen(3040, () => {
    console.log('App is running on port 3000')
});