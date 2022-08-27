// function getWeatherData(city) {
//     fetch(
//         `http://api.openweathermap.org/data/2.5/onecall?q=${city}&APPID=9e351cd49f8ea7e18da3306e30f40c1f`,
//         { mode: 'cors' }
//     )
//         .then((resp) => {
//             if (!resp.ok) throw new Error(resp.statusText());
//             return resp.json();
//         })
//         .then((data) => console.log(data))
//         .catch((err) => console.log(err));
// }

// getWeatherData('ankara');
