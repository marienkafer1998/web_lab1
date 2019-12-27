import {describe} from "mocha";
import {assert} from "chai";
import sinon from "sinon";
import {expect} from "chai";
import {JSDOM} from "jsdom";

import {utils} from "./utils"

import "regenerator-runtime/runtime";

global.document = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lab1</title>
</head>
<body>
<div>
    <h1>Weather forecast</h1>
    <form action="#" id="updateForm">
        <label for="cityName">What's weather in </label>
        <input id="cityName" required type="text" value="Saint">
        <input id="updateButton" type="submit" value="Check!">
    </form>
</div>
<div id="weatherContainer"></div>
    <script id="weatherTemplate" type="text/x-handlebars-template">
        <h3>Current weather in {{name}}: </h3>
        <table>
            <tr>
                <th>Temperature</th>
                <td>{{ this.main.temp}} &deg;C</td>
            </tr>
            <tr>
                <th>Sky</th>
                <td>{{this.weather.0.description}}</td>

            </tr>
            <tr>
                <th>Pressure</th>
                <td>{{this.main.pressure}} hpa</td>

            </tr>
            <tr>
                <th>Humidity</th>
                <td>{{this.main.humidity}} %</td>
            </tr>
            <tr>
                <th>Wind speed</th>
                <td>{{this.wind.speed}} m/s</td>
            </tr>

            </tr>

        </table>

    </script>

<div id="errorContainer"></div>
<script id="errorTemplate" type="text/x-handlebars-template">
    <h1 class="errorMessage">Error {{this.cod}}: {{this.message}}</h1>
</script>

</body>
</html>`).window.document;

console.log(document.body.innerHTML);



let forecast = {
    "coord": {"lon": 37.62, "lat": 55.75},
    "weather":
        [{
            "id": 803,
            "main": 'Clouds',
            "description": 'broken clouds',
            "icon": '04d'
        }],
    "base": 'stations',
    "main":
        {
            "temp": 272.44,
            "feels_like": 267.29,
            "temp_min": 271.15,
            "temp_max": 274.26,
            "pressure": 1019,
            "humidity": 86
        },
    "visibility": 10000,
    "wind": {"speed": 4, "deg": 280},
    "clouds": {"all": 58},
    "dt": 1576823676,
    "sys":
        {
            "type": 1,
            "id": 9029,
            "country": 'RU',
            "sunrise": 1576821403,
            "sunset": 1576846621
        },
    "timezone": 10800,
    "id": 524901,
    "name": 'Moscow',
    "cod": 200
};

let errorMessage = {
    "cod": 404,
    "message": "city not found"
};


describe('updateWeather with correct data', () => {
    let stubbedGetCityWeather = sinon.stub(), templatedData;
    before( async () => {
        stubbedGetCityWeather = sinon.stub(utils, 'getWeather');
        stubbedGetCityWeather.resolves(forecast);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = utils.template(forecast);
        templatedData = tempDiv.innerHTML;

    });

    after(() => {
        stubbedGetCityWeather.restore();
    });

    it('Should be rendered as expected', async function () {

        await utils.updateWeather({
            target: {
                cityName: {
                    value: 'Moscow'
                }
            }
        });

        // console.log(document.getElementById('weatherContainer').innerHTML);
        // console.log(templatedData);

        expect(document.getElementById('weatherContainer').innerHTML).to.be.equal(templatedData);
    });

    it('Should contain city name', async function () {
        await utils.updateWeather({
            target: {
                cityName: {
                    value: 'Moscow'
                }
            }
        });
        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('Current weather in Moscow:')
    });

});


describe('updateWeather with incorrect data', () => {
    let stubbedGetCityWeather = sinon.stub(), templatedData;
    before( async () => {
        stubbedGetCityWeather = sinon.stub(utils, 'getWeather');
        stubbedGetCityWeather.resolves(errorMessage);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = utils.errorTemplate(errorMessage);
        templatedData = tempDiv.innerHTML;

    });

    after(() => {
        stubbedGetCityWeather.restore();
    });

    it('Should be rendered as expected', async function () {

        await utils.updateWeather({
            target: {
                cityName: {
                    value: 'Moscow1'
                }
            }
        });

        console.log(document.getElementById('errorContainer').innerHTML);
        console.log(templatedData);

        expect(document.getElementById('errorContainer').innerHTML).to.be.equal(templatedData);
    });

    it('Should contain error message', async function () {
        await utils.updateWeather({
            target: {
                cityName: {
                    value: 'Moscow1'
                }
            }
        });
        expect(document.getElementById('errorContainer').innerHTML).to.be.contain('Error 404: city not found')
    });

});


describe('showWeather', () => {
    it(' function "showWeather" render  all info correctly', () => {
        utils.showWeather(forecast);
        [
            'Temperature',
            'Sky',
            'Humidity',
            'Pressure',
            'Wind speed'
        ].forEach((item) => {
            expect(document.getElementById('weatherContainer').innerHTML).to.be.contain(item)
        })

    });

    it('Should contain city name', () =>  {
        utils.showWeather(forecast);

        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('Current weather in Moscow:')
    });

    it('Should contain correct temperature', () =>  {
        //console.log(document.body.innerHTML);

        utils.showWeather(forecast);
        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('272.44 °C')
    });

    it('Should contain correct sky description', () =>  {
        utils.showWeather(forecast);
        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('broken clouds')
    });

    it('Should contain correct humidity', () =>  {
        utils.showWeather(forecast);
        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('86 %')
    });

    it('Should contain correct pressure', () =>  {
        utils.showWeather(forecast);
        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('1019 hpa')
    });
    it('Should contain correct wind-speed', () =>  {
        utils.showWeather(forecast);
        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('4 m/s')
    });

    it('errorContainer should be empty ', () =>  {
        utils.showWeather(forecast);
        expect(document.getElementById('errorContainer').innerHTML).to.be.contain('')
    });


});

describe('showError', () => {
    it(' function "showError" render  correctly', () => {
        utils.showError(errorMessage);

        expect(document.getElementById('errorContainer').innerHTML).to.be.contain('Error 404: city not found')

    });

    it('weatherContainer should be empty ', () =>  {
        utils.showWeather(forecast);
        expect(document.getElementById('weatherContainer').innerHTML).to.be.contain('')

    });


});