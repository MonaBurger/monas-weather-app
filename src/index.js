/** @format */
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-form-input");
  console.log(cityInput);
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = cityInput.value;
}
let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", changeCity);
