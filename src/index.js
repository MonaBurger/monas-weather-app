/** @format */
function refreshWeatherData(response) {
  let city = response.data.city;
  let temperature = response.data.temperature.current;
  let currentTemperature = document.querySelector(".current-temperature");
  let currentCity = document.querySelector(".city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let timeELement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");

  currentCity.innerHTML = city;
  currentTemperature.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeELement.innerHTML = formatDate(date);
  icon.innerHTML = `<img
      src=${response.data.condition.icon_url}
      class="icon"
    />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "484c5880942e8bc04a5205c53o4et26f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-form-input");

  searchCity(cityInput.value);
}
let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", changeCity);

searchCity("Hamburg");
