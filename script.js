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
  // City Name (Date) cloud icon
  //Temperature: in F
  //Humidity: 41%
  //Wind Speed: 4.7 MPH
  //UV index: 9.49 in red box.....
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // $("#search-box").append(`<button class = "city-btn">${response.name}`);
    console.log(response); // TODO: remove console.log
    let title = $("<h4>").text(response.name);
    dailyForecast.append(title);
    let temp = $("<p>").text(response.main.temp);
    dailyForecast.append(temp);
    let humidity = $("<p>").text(response.main.humidity);
    dailyForecast.append(humidity);
    let windSpeed = $("<p>").text(response.wind.speed);
    dailyForecast.append(windSpeed);
    // let uvIndex = $("<p>").text(response.main.temp);
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
function renderCities() {
  searchResults.empty();
  for (var i = 0; i < cityList.length; i++) {
    var createBtn = $("<button>");
    createBtn.addClass("city-btn"); //TODO: Change class another exists in ajax request but might be fine?
    createBtn.attr("data-name", cityList[i]);
    searchResults.append(createBtn);
  }
}

// TODO: Handles events when a city button is clicked
$("#search-btn").on("click", function (event) {
  event.preventDefault();
  // Grab text from input box and add to cityList array
  let city = $("#city-input").val().trim();
  cityList.push(city);
  renderCities();
});
renderCities();
