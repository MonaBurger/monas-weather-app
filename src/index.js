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
  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "484c5880942e8bc04a5205c53o4et26f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <img
              src="${day.condition.icon_url}" class="forecast-icon"
            />
            <div class="forecast-temperature">
              <strong class="forecast-max">${Math.round(
                day.temperature.maximum
              )}°</strong>
              <span class="forecast-min">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>
          `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let forecastElement = document.querySelector("#forecast");
let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", changeCity);

searchCity("Hamburg");
