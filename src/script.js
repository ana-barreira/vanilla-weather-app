
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#current-weekday");
currentDay.innerHTML = `${day}`;

let currentHour = document.querySelector("#current-time");
let currentMinute = document.querySelector("#current-minute");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
currentHour.innerHTML = `${hour}:`;
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentMinute.innerHTML = `${minute}`;

function showTemperature(response) {
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentDescription = document.querySelector("#weatherDescription");
  currentDescription.innerHTML = response.data.weather[0].main;
  let currentCity=document.querySelector("#city");
  currentCity.innerHTML=response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement=document.querySelector("#icon");
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
   celsiusTemperature = response.data.main.temp;

}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }}
function searchCity(city){
  let apiKey = "377b65e5ab39dbbbf56ae5019ed7e717";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#searching").value;
   searchCity(city);
}
let form = document.querySelector("#enter-city");
form.addEventListener("submit", search);

function showData(response) {
  let currentTemp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let currentDescription = document.querySelector("#weatherDescription");
  currentDescription.innerHTML = response.data.weather[0].main;
 document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement=document.querySelector("#icon");
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let apiKey = "377b65e5ab39dbbbf56ae5019ed7e717";
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
   celsiusTemperature = response.data.main.temp;
  
   
  }
  
function retrievePosition(position) {
  let apiKey = "377b65e5ab39dbbbf56ae5019ed7e717";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showData);
   
}
function getNav(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);

}

let currentLocation = document.querySelector("#currentLocationButton");
currentLocation.addEventListener("click", getNav);


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}



let celsiusTemperature=null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
searchCity("Braga");