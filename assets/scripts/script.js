var APIKey = "cb66a065187c471ce473ef1bec816d74";
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cb66a065187c471ce473ef1bec816d74";

var searchBar = $('#searchBar');
var searchButton = $('.searchButton');
var searchHistory = $('#searchHistory');
let searchList = [];
var city = searchBar.val();
var lon = 0;
var lat = 0;



// TODO: Weather days function
// Access weather api from searchbar input
// grab 6 days worth of weather
// include date, icon for the type of weather, temperature, wind speeds, humidity
// first datecard should be bigger than the others and include the NAME
// appends to the page

function getGeoCode(event) {



    requestGeoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=cb66a065187c471ce473ef1bec816d74";


    fetch(requestGeoCode)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

  })};



// function getApi() {


//     requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cb66a065187c471ce473ef1bec816d74";


//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);

//   })};




// creates an object based on what the user puts into the search bar
// adds that object to our global array so we can make search buttons based on our history
// creates a button with the city's name in a search history list
function saveCityName(event) {
    event.preventDefault();
    let search = {
        city: searchBar.val().trim()
    } 
    
    searchList.unshift(search);
    console.log(searchList);

    localStorage.setItem("User Searches", JSON.stringify(searchList));

    var button = document.createElement("button");
 
    button.textContent = search.city;
    button.setAttribute("class", "newButton btn btn-outline-secondary");    
       
    button.setAttribute("type", "button");
    searchHistory.append(button);


    function getGeoCode() {



        requestGeoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + search.city + "&limit=1&appid=cb66a065187c471ce473ef1bec816d74";
    
    
        fetch(requestGeoCode)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);


            var longitude = data[0].lon;
            var latitude = data[0].lat;
            
            var lat = lat + latitude;
            var lon = lon + longitude;
            
            console.log(lon);
            console.log(lat);
            return lon, lat;
      })};

      getGeoCode();
    // getApi();
};


// TODO: function that lets the search history buttons search like a new term
function searchHistoryList(event) {
    event.preventDefault();
}




searchButton.on('click', saveCityName);