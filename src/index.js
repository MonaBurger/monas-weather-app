/** @format */
function refreshWeatherData(response) {
  let city = response.data.city;
  let temperature = response.data.temperature.current;
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = Math.round(temperature);
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = city;
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
