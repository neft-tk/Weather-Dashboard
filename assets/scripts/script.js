var APIKey = "cb66a065187c471ce473ef1bec816d74";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var searchBar = $('#searchBar');
var searchButton = $('.searchButton');
var searchHistory = $('#searchHistory');
let searchList = [];
var city = searchList[0];



// TODO: Weather days function
// Access weather api from searchbar input
// grab 6 days worth of weather
// include date, icon for the type of weather, temperature, wind speeds, humidity
// first datecard should be bigger than the others and include the NAME
// appends to the page

// function getApi() {
  
//     fetch(queryUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         for (var i = 0; i < data.length; i++) {
//           var listItem = document.createElement('li');
//           listItem.textContent = data[i].city;
//           searchHistory.appendChild(listItem);
//         }
//       });
//   }

// TODO: 
// display locally stored names up to a certain amount?
// each name that appears on the page should be a button
// when that button is pressed, it should access the name it was given and plug that into the weather function 


// creates an object based on what the user puts into the search bar
// adds that object to our global array so we can make search buttons based on our history
function saveCityName(event) {
    event.preventDefault();
    let search = {
        city: searchBar.val()
    } 
    
    searchList.unshift(search);
    console.log(searchList);

    localStorage.setItem("User Searches", JSON.stringify(searchList));

};


searchButton.on('click', saveCityName);