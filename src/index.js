export default getData;

import { getCoordinates, getForecast } from './modules/api';
import initialize from './modules/UI';

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
        console.log(err);
    }
}

initialize();
