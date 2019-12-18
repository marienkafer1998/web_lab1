import { describe } from "mocha";
import { assert } from "chai";
import {getWeather} from "./utils"
import "regenerator-runtime/runtime";


describe('showWeather', function() {
    let weatherData;
    before(async () => {
        weatherData = await getWeather('Moscow');
    });

    it('name should be Moscow', () => {
        assert.equal(weatherData.name, 'Moscow');
    });


    it('list should contain all needed info', () => {
        assert.exists(weatherData.main.temp);
        assert.exists(weatherData.weather[0].description);
        assert.exists(weatherData.main.humidity);
        assert.exists(weatherData.main.pressure);
        assert.exists(weatherData.wind.speed);

    })

});
