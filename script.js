let searchBtn = $("#search-btn");
let searchBox = $("#search-box");
let searchResults = $(".search-results");
let apiKey = "b820eac750811c54acc2404d446a5629";
let cityList = ["Seattle", "Los Angeles", "Paris"];
let cityName = "Seattle";
let dailyForecast = $("#daily-container");
let fiveDayForcast = $("five-day-container");

//API call api.openweathermap.org/data/2.5/forecast?q={city name}&appid={b820eac750811c54acc2404d446a5629}
// let queryURL: "https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={apiKey}";

function displayWeather() {
  let city = $(this).attr("data-name");
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  // City Name (Date) *cloud icon
  //Temperature: in F
  //Humidity: 41%
  //Wind Speed: 4.7 MPH
  //UV index: 9.49 in red box.....
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response); // TODO: remove console.log
    let title = $("<h4>").text(response.name);
    dailyForecast.append(title);
    var tempF = (response.main.temp - 273.15) * 1.8 + 32; //Convert to degrees F
    let temp = $("<p>").text(`Temperature: ${tempF} °F`);
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
}
//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     $("#search-box").append(`<button class = "city-btn">${response.name}`);
//     console.log(response); // TODO: remove console.log
//   });
// }
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
  renderCityBtn();
});

//CLick event listener toa ll elements with class of "city-btn"
$(document).on("click", "city-btn", displayWeather);
renderCityBtn();
