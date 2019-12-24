const fetch = require("node-fetch");
const Handlebars = require('handlebars');
const API_KEY = 'c98ceead6e7b88c9c865eaf7bdbb291d';
const BASE_URL=`http://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&q=`;

 async function getWeather (cityName) {

    const response = await (await fetch(BASE_URL + cityName)).json();
    console.log(response);
    return response;
}

 async function updateWeather() {
    try {
        const cityName = event.target.cityName.value;
        console.log("inside updateWeather" + cityName);

        const data = await getWeather(cityName);
        console.log(data);

        if (data.cod == 200) {
            showWeather(data)

        } else {
            showError(data);
        }
    }
    catch (error) {
        showError(error);
    }
}

 function showWeather(data) {
    let source = document.getElementById("weatherTemplate").innerHTML;
    let template = Handlebars.compile(source);
    let html = template(data);
    document.getElementById("weatherContainer").innerHTML = html;
    document.getElementById("errorContainer").innerHTML = "";
}

 function showError(data) {
    let source = document.getElementById("errorTemplate").innerHTML;
    let template = Handlebars.compile(source);
    let html = template(data);
    document.getElementById("errorContainer").innerHTML = html;
    document.getElementById("weatherContainer").innerHTML = "";
}
export const utils = {updateWeather, getWeather, showWeather, showError};