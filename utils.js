const fetch = require("node-fetch");

const API_KEY = 'c98ceead6e7b88c9c865eaf7bdbb291d';
const BASE_URL=`http://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&q=`;

export async function getWeather (cityName) {

    const response = await (await fetch(BASE_URL + cityName)).json();
    console.log(response);
    return response;
}

