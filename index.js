const Handlebars = require('handlebars');
const API_KEY = 'c98ceead6e7b88c9c865eaf7bdbb291d';
const BASE_URL=`http://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&q=`;

async function updateWeather() {
    const cityName = event.target.cityName.value;
    const response = await fetch(BASE_URL + cityName);
    const data = await response.json();
    if (data.cod == 200) {
        showWeather(data)

    } else {
        showError(data);
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

Handlebars.registerHelper('convertDate', function (dt) {
    date = new Date(dt * 1000);
    return new Handlebars.SafeString(date.toUTCString().slice(0, -7))
});
