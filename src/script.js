
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
}

function searchCity(city){
  let apiKey = "377b65e5ab39dbbbf56ae5019ed7e717";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
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

searchCity("Braga");