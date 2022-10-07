var searchBar = $('#searchBar');
var searchButton = $('.searchButton')

// TODO: Weather days function
// Access weather api from searchbar input
// grab 6 days worth of weather
// include date, icon for the type of weather, temperature, wind speeds, humidity
// first datecard should be bigger than the others and include the NAME
// appends to the page
function getWeather() {
    var search = {
        city: searchBar.val()
    }
    localStorage.setItem("Search", JSON.stringify(search));
    console.log(search);
    var historyList = [];
    historyList.textContent(search);
    console.log(historyList);
}


// TODO: locally store the search history from the cityname search bar
// display locally stored names up to a certain amount?
// each name that appears on the page should be a button
// when that button is pressed, it should access the name it was given and plug that into the weather function 

searchButton.on('click', getWeather);