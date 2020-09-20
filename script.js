let searchBtn = $("#search-btn");
let searchBox = $("#search-box");
let cityName = "Seattle";
let apiKey = "b820eac750811c54acc2404d446a5629";
let cityList = [];
//API call api.openweathermap.org/data/2.5/forecast?q={city name}&appid={b820eac750811c54acc2404d446a5629}
// let queryURL: "https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={apiKey}";
let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  $("#search-box").append(`<button>${response.name}`);
  console.log(response);
});

// TODO: create cityList array that adds a button to the searchBox after the user submits
// TODO:
