import getData from '../index.js';
import dateModule from './date.js';
import utilityModule from './utility.js';

const UI = (function () {
    const searchBtn = document.querySelector('.search-btn');

    async function _displayWeather(city = 'Los Angeles') {
        // Modules
        console.log(city);
        const myData = await getData(city);
        const myUtilityModule = utilityModule;
        const myDateModule = dateModule;
        const myDataTimeOfRequest = myUtilityModule.changeTimeZone(
            myUtilityModule.getDate(myData.current.dt),
            myData.timezone
        );
        const myDataTimeOfSunrise = myUtilityModule.changeTimeZone(
            myUtilityModule.getDate(myData.current.sunrise),
            myData.timezone
        );
        const myDataTimeOfSunset = myUtilityModule.changeTimeZone(
            myUtilityModule.getDate(myData.current.sunset),
            myData.timezone
        );

        // Main property values
        const cloudTypeSection = document.querySelector('.cloud-type-section');
        const cloudType = document.querySelector('.cloud-type');
        const cityName = document.querySelector('.city-name');
        const date = document.querySelector('.date');
        const time = document.querySelector('.time');
        const temp = document.querySelector('.temp');
        const div = document.createElement('div');
        div.classList.add('svg-container');
        div.innerHTML = myUtilityModule.getWeatherIcons(
            myData.current.weather[0].icon
        );
        // Removes old svg if it exists
        const oldSvg = cloudTypeSection.querySelector('.svg-container');
        if (oldSvg) oldSvg.remove();

        cloudTypeSection.prepend(div);
        cloudType.textContent = myUtilityModule.upperCaseInitials(
            myData.current.weather[0].description
        );
        cityName.textContent = city;
        date.textContent = myDateModule.getFullDate(myDataTimeOfRequest);
        time.textContent = myDateModule.getFullTime(myDataTimeOfRequest);
        temp.textContent =
            myUtilityModule.kelvinToCelcius(myData.current.temp) + ' \u{2103}';

        // Secondary property values
        const feelsLike = document.querySelector('.feelslike-value');
        const humidity = document.querySelector('.humidity-value');
        const rainChance = document.querySelector('.rain-chance-value');
        const windSpeed = document.querySelector('.wind-speed-value');
        const sunrise = document.querySelector('.sunrise-value');
        const sunset = document.querySelector('.sunset-value');

        feelsLike.textContent =
            myUtilityModule.kelvinToCelcius(myData.current.feels_like) +
            ' \u{2103}';
        humidity.textContent = myData.current.humidity + ' %';
        rainChance.textContent = myData.current.clouds + ' %';
        windSpeed.textContent = myData.current.wind_speed + ' km/h';
        sunrise.textContent = myDateModule.getFullTime(myDataTimeOfSunrise);
        sunset.textContent = myDateModule.getFullTime(myDataTimeOfSunset);

        // Daily forecasts
        const dailyNames = [...document.querySelectorAll('.day-name')];
        const dailyMaxTemps = [...document.querySelectorAll('.day-max-temp')];
        const dailyMinTemps = [...document.querySelectorAll('.day-min-temp')];
        const today = myDataTimeOfRequest;
        const dailyData = myData.daily;
        let curDay = today;

        for (let i = 0; i <= 6; i++) {
            // Day names
            curDay.setDate(today.getDate() + 1);
            dailyNames[i].textContent = myDateModule.getDayName(curDay);
            // Max temperature
            const curMaxTemp = myUtilityModule.kelvinToCelcius(
                dailyData[i + 1].temp.max
            );
            // Min temperature
            const curMinTemp = myUtilityModule.kelvinToCelcius(
                dailyData[i + 1].temp.min
            );
            dailyMaxTemps[i].textContent = curMaxTemp + ' \u{2103}';
            dailyMinTemps[i].textContent = curMinTemp + ' \u{2103}';

            // Weather icon
            const curIconCode = dailyData[i + 1].weather[0].icon;
            const div = document.createElement('div');
            div.classList.add('daily-svg-container');
            const spanElement = document.querySelector(`.day-${i + 1}-svg`);

            div.innerHTML = myUtilityModule.getWeatherIcons(curIconCode);

            // Removes old svg if it exists
            const oldSvg = spanElement.querySelector('.daily-svg-container');
            if (oldSvg) oldSvg.remove();
            // Displays new svg
            spanElement.prepend(div);
        }
    }

    function initialize() {
        _displayWeather();
    }

    function _displayWeatherForInput() {
        const searchInput = document.querySelector('.search-bar').value;
        console.log(searchInput);
        _displayWeather(searchInput);
    }

    searchBtn.addEventListener('click', _displayWeatherForInput);
    return { initialize };
})();

export default UI;
