const Handlebars = require('handlebars');
const axios = require("axios");
const apiKey = 'c98ceead6e7b88c9c865eaf7bdbb291d';
const baseURL = `http://api.openweathermap.org/data/2.5/forecast?APPID=${apiKey}&q=`;

let template;
axios.get('templates/weather_data.handlebars').then(
    (response) => {
        template = Handlebars.compile(response.data);
    }
);


async function updateWeather() {
    console.log(event.target.city_name);
    const weatherData = document.getElementById('weatherData');
    try {
        const cityName = event.target.cityName.value;
        const response = await axios.get(baseURL + cityName);
        const data = response.data;
        weatherData.innerHTML = template(data)
    } catch (error) {
        weatherData.innerText = 'Oops! Something is wrong!\n ' + error;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const updateForm = document.getElementById('updateForm');
    updateForm.addEventListener('submit', updateWeather);
    updateForm.updateButton.click();
});

Handlebars.registerHelper('convertTemp', function (temp) {
    return new Handlebars.SafeString((temp - 273.15).toFixed(1).toString())
});

Handlebars.registerHelper('convertDate', function (dt) {
    date = new Date(dt * 1000);
    return new Handlebars.SafeString(date.toUTCString().slice(0, -7))
});
