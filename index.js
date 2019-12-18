const Handlebars = require('handlebars');
import {getWeather} from './utils'
import "regenerator-runtime/runtime";


async function updateWeather() {
    try {
    const cityName = event.target.cityName.value;
    console.log("inside updateWeather" + cityName);

    const data =  await getWeather(cityName);
    console.log(data);

    if (data.cod == 200) {
        showWeather(data)

    } else {
        showError(data);
    }}
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


document.addEventListener('DOMContentLoaded', function () {
    const updateForm = document.getElementById('updateForm');
    updateForm.addEventListener('submit', updateWeather);
    updateForm.updateButton.click();
});

Handlebars.registerHelper('convertTemp', function (temp) {
    return new Handlebars.SafeString((temp - 273.15).toFixed(1).toString())
});

