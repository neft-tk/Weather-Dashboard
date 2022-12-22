var APIKey = "cb66a065187c471ce473ef1bec816d74";
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cb66a065187c471ce473ef1bec816d74";

var searchBar = $("#searchBar");
var searchButton = $(".searchButton");
var searchHistory = $("#searchHistory");
let currentWeather = $("#today");
let searchList = [];

// function createPage() {

//     let div = document.createElement('div');
//     let h1 = document.createElement("h2");
//     let p = document.createElement("p");
//     let p2 = document.createElement("p");
//     let p3 = document.createElement("p");
// }

// TODO: Weather days function
// grab 6 days worth of weather
// include date, icon for the type of weather, temperature, wind speeds, humidity
// first datecard should be bigger than the others and include the NAME
// appends to the page

// Takes in two coordinates
// Plugs them into our actual weather API
function getWeather(lat, lon) {
  requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let divData = document.getElementById("search1");
      if (divData !== null) {
        divData.remove();
      }

      let div = document.createElement("div");
      let h1 = document.createElement("h2");
      let p = document.createElement("p");
      let p2 = document.createElement("p");
      let p3 = document.createElement("p");
      let img = document.createElement("img");

      let tempCityName = data.name;

      img.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      img.setAttribute("style", "max-height: 5%");
      img.setAttribute("style", "max-width: 5%");

      div.setAttribute("class", "card");
      div.setAttribute("id", "search1");
      currentWeather.append(div);

      h1.textContent = tempCityName + " | " + moment().format("MMM Do YY");
      div.append(h1);
      h1.append(img);

      let tempCityWind = data.wind.speed;
      p.textContent = "Wind Speed: " + tempCityWind + " MPH";
      div.append(p);

      let rawData = data.main.temp;
      let tempCityWeather =
        Math.floor((1.8 * (rawData - 273) + 32) * 100) / 100;
      p2.textContent = "Temperature: " + tempCityWeather + " Degrees";
      div.append(p2);

      let tempCityHumidity = data.main.humidity;
      p3.textContent = "Humidity: " + tempCityHumidity + "%";
      div.append(p3);
    });
}

// grabs the latitude and longitude coordinates for the city
// returns the two coordinates into our other API function
function getGeoCode(city) {
  requestGeoCode =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=cb66a065187c471ce473ef1bec816d74";

  fetch(requestGeoCode)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let lon = data[0].lon;
      let lat = data[0].lat;

      console.log(lon);
      console.log(lat);

      getWeather(lat, lon);
    });
}

// creates an object based on what the user puts into the search bar
// adds that object to our global array so we can make search buttons based on our history
// creates a button with the city's name in a search history list, the button will run getGeoCode which basically restarts the whole function just with that button's (city)name
// runs the function to actually get the weather
function saveCityName(event) {
  event.preventDefault();
  let search = {
    city: searchBar.val().trim(),
  };

  searchList.unshift(search);
  console.log(searchList);

  localStorage.setItem("User Searches", JSON.stringify(searchList));

  var button = document.createElement("button");

  button.textContent = search.city;
  button.setAttribute("class", "newButton btn btn-outline-secondary");

  button.setAttribute("type", "button");
  button.addEventListener("click", function (event) {
    let pressed = event.target;
    let newCityName = pressed.innerText;
    getGeoCode(newCityName);
  });
  searchHistory.append(button);

  getGeoCode(search.city);
}

function pageStartUp() {
  let savedSearches = JSON.parse(localStorage.getItem("User Searches"));
  console.log(savedSearches);

  if (savedSearches !== null) {
    savedSearches.map((search) => {
      var button = document.createElement("button");

      button.textContent = search.city;
      button.setAttribute("class", "newButton btn btn-outline-secondary");

      button.setAttribute("type", "button");
      button.addEventListener("click", function (event) {
        let pressed = event.target;
        let newCityName = pressed.innerText;
        getGeoCode(newCityName);
      });
      searchHistory.append(button);
    });
  }
}

// TODO: function that lets the search history buttons search like a new term
function searchHistoryList(event) {
  event.preventDefault();
}

pageStartUp();

searchButton.on("click", saveCityName);
