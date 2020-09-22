let searchBtn = $("#search-btn");
let searchBox = $("#search-box");
let searchResults = $(".search-results");
let apiKey = "b820eac750811c54acc2404d446a5629";
let cityList = ["Los Angeles", "Paris", "Seattle"];
let cityName = "Seattle";
let dailyForecast = $("#daily-container");
let fiveDayForecast = $("#five-day-container");

TODO: searchBox.val(localStorage.getItem("city"));

function displayWeather() {
  // Daily Forecast
  dailyForecast.empty();
  fiveDayForecast.empty();
  let city = $(this).attr("data-name");
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  let queryURLFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response); // TODO: remove console.log
    // Append with styling
    let title = $("<h4>").text(
      `${response.name} - ${moment().format("MMM Do YY")}`
    );
    dailyForecast.append(title);
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    let temp = $("<p>").text(`Temperature: ${tempF.toFixed(1)} °F`);
    dailyForecast.append(temp);
    let humidity = $("<p>").text(`Humidity: ${response.main.humidity}%`);
    dailyForecast.append(humidity);
    let windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
    dailyForecast.append(windSpeed);
    // TODO: Find UV index
    //let uvIndex = $("<p>").text(response.main.temp);
    //uvIndex.addClass("uvIndex")
    // dailyForecast.append(uvIndex);
  });
  // Five Day Forecast
  $.ajax({
    url: queryURLFiveDay,
    method: "GET",
  }).then(function (response) {
    console.log(response); // TODO: remove console.log
    let fiveDaysArray = [0, 8, 16, 24, 32];
    //Loop to create 5 days
    for (let i = 0; i < fiveDaysArray.length; i++) {
      //  TODO: create new div for each day to be placed into
      // let newBox = $("<div class='new-box'>")
      //
      // let fiveDayBlock = fiveDayForecast.append(newBox);

      let title = $("<p>").text(`${response.list[fiveDaysArray[i]].dt_txt}`);
      fiveDayForecast.append(title);
      let tempF =
        (response.list[fiveDaysArray[i]].main.temp - 273.15) * 1.8 + 32;
      let temp = $("<p>").text(`Temperature: ${tempF.toFixed(1)} °F`);
      fiveDayForecast.append(temp);
      let humidity = $("<p>").text(
        `Humidity: ${response.list[fiveDaysArray[i]].main.humidity}%`
      );
      fiveDayForecast.append(humidity);
      let icon = $("<p>").text(
        `${response.list[fiveDaysArray[i]].weather[0].icon}%`
      );
      fiveDayForecast.append(icon);
    }
  });
}
// TODO: create cityList array that adds a button to the searchBox after the user submits
//Renders the city list buttons in the Search box
function renderCityBtn() {
  searchResults.empty();
  for (var i = 0; i < cityList.length; i++) {
    var createBtn = $("<button>");
    createBtn.addClass("city-btn");
    createBtn.attr("data-name", cityList[i]);
    createBtn.text(cityList[i]);
    searchResults.prepend(createBtn);
  }
}

// TODO: Creates new city button
$("#search-btn").on("click", function (event) {
  event.preventDefault();
  // Grab text from input box and add to cityList array
  let city = $("#city-input").val().trim();
  cityList.push(city);
  if ((city = "")) {
    // TODO: Stops function and doesn't add an empty box
    return 0;
  }
  // Save added city to "cityList"
  localStorage.setItem("city", JSON.stringify(cityList));
  displayWeather();
  renderCityBtn();
});

//CLick event listener to all elements with class of "city-btn"
$(document).on("click", ".city-btn", displayWeather);
renderCityBtn();
// displayWeather();
