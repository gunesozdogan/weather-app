export default initialize;

import getData from '../index.js';
import dateModule from './date.js';
import utilityModule from './utility.js';

async function initialize(city = 'Los Angeles') {
    // Modules
    const myData = await getData(city);
    const myUtilityModule = utilityModule;
    const myDateModule = dateModule;
    const myDataTimeOfRequest = myUtilityModule.changeTimeZone(
        myUtilityModule.getCurrentDate(myData),
        myData.timezone
    );

    // Initializing main property values
    const cloudTypeSection = document.querySelector('.cloud-type-section');
    const cloudType = document.querySelector('.cloud-type');
    const cityName = document.querySelector('.city-name');
    const date = document.querySelector('.date');
    const time = document.querySelector('.time');
    const temp = document.querySelector('.temp');
    const div = document.createElement('div');

    div.innerHTML = myUtilityModule.getWeatherIcons(
        myData.current.weather[0].icon
    );
    cloudTypeSection.prepend(div);
    cloudType.textContent = myUtilityModule.upperCaseInitials(
        myData.current.weather[0].description
    );
    cityName.textContent = city;
    date.textContent = myDateModule.getFullDate(myDataTimeOfRequest);
    time.textContent = myDateModule.getFullTime(myDataTimeOfRequest);
    temp.textContent =
        myUtilityModule.kelvinToCelcius(myData.current.temp) + ' \u{2103}';
}
