import {describe} from "mocha";
import {getWeather} from "./utils"
import "regenerator-runtime/runtime";


describe('showWeather', function() {
    let weatherData;
    before(async () => {
        weatherData = await getWeather('Moscow'); //проблемы с async, из-за этого не могу протестировать работоспособность тестов
    });

    it('name should be Moscow', () => {
        assert.equal(weatherData.name, 'Moscow');
    });


    it('list should contain all needed info', () => {
        assert.exists(weatherData.main.temp);
        // assert.exists(weatherData.0.description);
        assert.exists(weatherData.main.humiduty);
        assert.exists(weatherData.main.pressure);
        assert.exists(weatherData.main.description);

    })

});
