const Handlebars = require('handlebars');
import {utils} from './utils'
import "regenerator-runtime/runtime";


 async function updateWeather(event) {
    try {
        const cityName = event.target.cityName.value;
        console.log("inside updateWeather" + cityName);

        const data = await utils.getWeather(cityName);
        console.log(data);

        if (data.cod == 200) {
            utils.showWeather(data);

        } else {
            utils.showError(data);
        }
    }
    catch (error) {
        utils.showError(error);
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

export const func = {updateWeather};