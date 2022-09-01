export default getData;

import { getCoordinates, getForecast } from './modules/api';
import UI from './modules/UI.js';

async function getData(city) {
    try {
        const cityData = await getCoordinates(city);
        const forecast = await getForecast(cityData.coord);
        const {
            daily,
            current,
            timezone,
            timezone_offset: timeOffset,
        } = forecast;

        const data = {
            daily,
            current,
            timezone,
            timeOffset,
        };
        console.log(data);
        return data;
    } catch (err) {
        const loadingText = document.querySelector('.loading-text');
        loadingText.textContent = 'City could not be found!';
        loadingText.style.letterSpacing = '0.2rem';
    }
}

UI.initialize();
