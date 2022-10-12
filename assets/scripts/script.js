var APIKey = "cb66a065187c471ce473ef1bec816d74";
// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cb66a065187c471ce473ef1bec816d74";

var searchBar = $('#searchBar');
var searchButton = $('.searchButton');
var searchHistory = $('#searchHistory');
let currentWeather = $('#today');
let searchList = [];
let div
let title



// TODO: Weather days function
// grab 6 days worth of weather
// include date, icon for the type of weather, temperature, wind speeds, humidity
// first datecard should be bigger than the others and include the NAME
// appends to the page

// Takes in two coordinates
// Plugs them into our actual weather API
function getWeather(lat, lon) {

    requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=cb66a065187c471ce473ef1bec816d74";


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let card = document.querySelectorAll('.card');
            currentWeather.remove(card);


            let div = document.createElement('div');
            let h2 = document.createElement("h2");
            

            div.setAttribute("class", "card");
        
            let tempCityName = data.name;
            console.log(tempCityName);
            h2.textContent = tempCityName;  
                  
           
            currentWeather.append(div);
            div.append(h2);
        })
};

// grabs the latitude and longitude coordinates for the city 
// returns the two coordinates into our other API function
function getGeoCode(city) {
    requestGeoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=cb66a065187c471ce473ef1bec816d74";

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

        })
};


// creates an object based on what the user puts into the search bar
// adds that object to our global array so we can make search buttons based on our history
// creates a button with the city's name in a search history list, the button will run getGeoCode which basically restarts the whole function just with that button's (city)name
// runs the function to actually get the weather
function saveCityName(event) {
    event.preventDefault();
    let search = {
        city: searchBar.val().trim(),
    }

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
};



// TODO: function that lets the search history buttons search like a new term
function searchHistoryList(event) {
    event.preventDefault();
}




searchButton.on('click', saveCityName);