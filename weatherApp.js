

// Start JS code



function saveCitiesSearched(citiesStringList) {
    // clear city weather data, but keeping searched cities
    $("#citiesInlocalStorage").empty();  
    var keys = Object.keys(citiesStringList);
    for (var i = 0; i < keys.length; i++) {
      var cityListEntry = $("<button>");
      cityListEntry.addClass("citiesListed"); 
      // seperate out the string  
      var splitStringOut = keys[i].toLowerCase().split(" ");
      for (var j = 0; j < splitStringOut.length; j++) {
        splitStringOut[j] =
          splitStringOut[j].charAt(0).toUpperCase() + splitStringOut[j].substring(1);
      }
      var cityNamey = splitStringOut.join(" ");
      cityListEntry.text(cityNamey);  
      $("#citiesInlocalStorage").append(cityListEntry);
    }
  }
  
  




//   function to get data using API calls - to build out:
  function getWeatherData(city, citiesStringList) {

    console.log("streaming turtles are cool! ");
    console.log("My API Key from OpenWeatherMap is: e012fbc5ba9141b98a8748d19623cffb ")
    console.log("City Search Query Sring is: https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=city ")
    // API key: e012fbc5ba9141b98a8748d19623cffb from OpenWeatherMap
    var myQueryAPI = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=city"

  }
  









// this will run when the DOM has been loaded and ready to be acted on by Javascript
$(document).ready(function() {
    // assign any current localStorage
    var citiesStringListStringified = localStorage.getItem("citiesStringList");
    // un-Stringify localStorage back to object form
    var citiesStringList = JSON.parse(citiesStringListStringified);
    // if no localStorage exists, make object for weather data storage
    if (citiesStringList == null) {
      citiesStringList = {};
    }
    
    saveCitiesSearched(citiesStringList);
    // hide previous city forcast when page loads
    $("cityWeather").hide();
    $("#fiveDayForecast").hide();
    // 
    // when you click on the button - check to see if empty or has a city typed inside
    $("#searchCityWeatherButn").on("click", function(event) {
      event.preventDefault();  // don't submit to any server
      var city = $("#userInput").val().trim().toLowerCase();  // returns the input value, removes white space an toLowerCase
      // check if something is in "userCityInput" first - then set it to true and localStorage it & stringify at the same time 
      if (city != "") {      
        citiesStringList[city] = true;
        localStorage.setItem("citiesStringList", JSON.stringify(citiesStringList));
      // function call to that makes a query to find the weather and puts info into the bootstrap cards
      getWeatherData(city, citiesStringList);
      // show in the HTML current searched city weather
      $("cityWeather").show();
      $("#fiveDayForecast").show();
      }    
    });
    // same as above for #searchCityWeatherButn" - I can reFactor later to un DRY the code at some later time
    // when you click on any of the localStorage listed cities below in the <ul> "" the search input field - I show the stored data, & weather data re populates its fields
    $("#citiesInlocalStorage").on("click", "button", function(event) {
      event.preventDefault();
      var city = $(this).text(); // grab the content of "this" html button text content
      // function call to that makes a query to find the weather and puts info into the bootstrap cards
      getWeatherData(city, citiesStringList);
      // show in the HTML current searched city weather
      $("cityWeather").show();
      $("#fiveDayForecast").show();
    });
  });