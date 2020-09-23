let searchBtn = $("#search-btn");
let searchBox = $("#search-box");
let searchResults = $(".search-results");
let apiKey = "b820eac750811c54acc2404d446a5629";
let cityList = JSON.parse(localStorage.getItem("city")) || [];
let cityName = "Seattle";
let dailyForecast = $("#daily-container");
let fiveDayForecast = $("#five-day-container");

searchBox.val(localStorage.getItem("city"));

function displayWeather(city) {
  // Daily Forecast
  dailyForecast.empty();
  fiveDayForecast.empty();
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  let queryURLFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    cityList.unshift(response.name);
    cityList = new Array(...new Set(cityList));
    // Save added city to "cityList"
    localStorage.setItem("city", JSON.stringify(cityList));
    renderCityBtn();

    // Append with styling
    let title = $("<h4>").text(
      `${response.name} - ${moment().format("MMM Do YY")}`
    );
    dailyForecast.append(title);
    let ImgUrl = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
    let wIcon = $("<img>").attr("src", ImgUrl);
    dailyForecast.append(wIcon);
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    let temp = $("<p>").text(`Temperature: ${tempF.toFixed(1)} °F`);
    dailyForecast.append(temp);
    let humidity = $("<p>").text(`Humidity: ${response.main.humidity}%`);
    dailyForecast.append(humidity);
    let windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
    dailyForecast.append(windSpeed);
  });
  // Five Day Forecast
  $.ajax({
    url: queryURLFiveDay,
    method: "GET",
  }).then(function (response) {
    let fiveDaysArray = [0, 8, 16, 24, 32];
    //Loop to create 5 days
    for (let i = 0; i < fiveDaysArray.length; i++) {
      //  Create new div for each day to be placed into
      let newBox = $("<div class='new-box'>");
      let fiveDayBlock = fiveDayForecast.append(newBox);
      //  Create daily content x5
      let title = $("<p>").text(`${response.list[fiveDaysArray[i]].dt_txt}`);
      newBox.append(title);
      let tempF =
        (response.list[fiveDaysArray[i]].main.temp - 273.15) * 1.8 + 32;
      let temp = $("<p>").text(`Temperature: ${tempF.toFixed(1)} °F`);
      newBox.append(temp);
      let humidity = $("<p>").text(
        `Humidity: ${response.list[fiveDaysArray[i]].main.humidity}%`
      );
      newBox.append(humidity);
      let icon = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${
          response.list[fiveDaysArray[i]].weather[0].icon
        }.png`
      );
      newBox.append(icon);
    }
  });
}
//Renders the city list buttons in the Search box
function renderCityBtn() {
  searchResults.empty();
  for (var i = 0; i < cityList.length; i++) {
    var createBtn = $("<button>");
    createBtn.addClass("city-btn");
    createBtn.attr("data-name", cityList[i]);
    createBtn.text(cityList[i]);
    searchResults.append(createBtn);
  }
}

// Creates new city button
$("#search-btn").on("click", function (event) {
  event.preventDefault();
  // Grab text from input box and add to cityList array
  let city = $("#city-input").val().trim();
  if (city === "") {
    // Stops function and doesn't add an empty box
    return;
  }
  displayWeather(city);
});

//CLick event listener that displays the newly searched city or one clicked from the list
$(document).on("click", ".city-btn", function () {
  let city = $(this).attr("data-name");
  displayWeather(city);
});

renderCityBtn();
if (cityList.length) {
  displayWeather(cityList[0]);
}
