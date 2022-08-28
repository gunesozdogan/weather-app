export { getCoordinates, getForecast };

async function getCoordinates(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9e351cd49f8ea7e18da3306e30f40c1f`,
        { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
}

async function getForecast(coordinates) {
    const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&APPID=9e351cd49f8ea7e18da3306e30f40c1f`,
        { mode: 'cors' }
    );
    const forecastData = await response.json();
    return forecastData;
}
