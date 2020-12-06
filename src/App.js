import './App.css';

const dayElement = document.querySelector(".date");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

// App data
const weather = {};

// Formating of current date display
var today = (new Date()).toString().split(' ').splice(1,3).join(' ');

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;

// API KEY
const url="http://api.openweathermap.org/data/2.5/weather?q=Toronto,Canada&APPID=35887d966835637940e67d76e47f1176";
const axios = require('axios');

// Make a request from URL
axios.get(url)
  .then(function (response) {
    // handle success
    let data = response.data;
    return data;
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.temperature.value2 = Math.floor(data.main.temp - KELVIN)* 9/5 + 32;
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
})
.then(function(){
    displayWeather();
})
.catch(function(error) {
  // handle error
  console.log(error);
})
.finally(function() {
  // always executed
});

// Weather data display
function displayWeather(){
  dayElement.innerHTML = today;
  iconElement.innerHTML = `<img height="133" width="126" src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span> | ${weather.temperature.value2}°<span>F</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function App() {

  return (
    <div className="App">

    </div>
  );
}

export default App;
