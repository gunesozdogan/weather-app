import getData from '../index.js';
import dateModule from './date.js';
import utilityModule from './utility.js';

const UI = (function () {
    const _searhBtn = document.querySelector('.search-btn');
    const _loadingText = document.querySelector('.loading-text');
    const _changeUnitBtn = document.querySelector('.unit-change-btn');

    // Modules
    const myUtilityModule = utilityModule;
    const myDateModule = dateModule;

    async function _displayWeather(city = 'Los Angeles') {
        // Sets loading text
        _loadingText.textContent = 'Loading ...';
        _loadingText.style.letterSpacing = '0.6rem';

        const myData = await getData(city);
        if (!myData) return;

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
        // Removes old weather icon if it exists
        const oldSvg = cloudTypeSection.querySelector('.svg-container');
        if (oldSvg) oldSvg.remove();

        cloudTypeSection.prepend(div);
        cloudType.textContent = myUtilityModule.upperCaseInitials(
            myData.current.weather[0].description
        );
        cityName.textContent = city[0].toUpperCase() + city.slice(1);
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

            // Removes old weather icon if it exists
            const oldSvg = spanElement.querySelector('.daily-svg-container');
            if (oldSvg) oldSvg.remove();
            // Displays new weather icon
            spanElement.prepend(div);

            // Removes loading text
            _loadingText.textContent = '';
        }
    }

    function initialize() {
        _displayWeather();
    }

    function _displayWeatherForInput() {
        const searchInput = document.querySelector('.search-bar').value;
        _displayWeather(searchInput);
    }

    function _changeTempUnit() {
        // If current display unit is celcius
        if (this.textContent.includes('\u{2109}')) {
            this.textContent = 'Display in ' + '\u{2103}';

            const temps = [...document.querySelectorAll('.celcius')];
            temps.forEach((temp) => {
                const tempInCelcius = temp.textContent.split(' ')[0];
                const tempInFahrenheit =
                    myUtilityModule.celciusToFahrenheit(tempInCelcius);
                temp.textContent = `${tempInFahrenheit} \u{2109}`;
                temp.classList.remove('celcius');
                temp.classList.add('fahrenheit');
            });
            // If current dispaly unit is fahrenheit
        } else {
            this.textContent = 'Display in ' + '\u{2109}';

            const temps = [...document.querySelectorAll('.fahrenheit')];
            temps.forEach((temp) => {
                const tempInFahrenheit = temp.textContent.split(' ')[0];
                const tempInCelcius =
                    myUtilityModule.fahrenheitToCelsius(tempInFahrenheit);
                temp.textContent = `${tempInCelcius} \u{2103}`;
                temp.classList.remove('fahrenheit');
                temp.classList.add('celcius');
            });
        }
    }

    _searhBtn.addEventListener('click', _displayWeatherForInput);
    _changeUnitBtn.addEventListener('click', _changeTempUnit);

    return { initialize };
})();

export default UI;
