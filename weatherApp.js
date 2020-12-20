
// Start JS code

function saveCitiesSearched(citiesKeyValObjList) {
    // clear city weather data, but keeping searched cities
    $("#citiesInlocalStorage").empty();  
    var keys = Object.keys(citiesKeyValObjList);
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
  function getWeatherData(city, citiesKeyValObjList) {
      
    console.log("streaming turtles are cool! ");
    // console.log("My API Key from OpenWeatherMap is: e012fbc5ba9141b98a8748d19623cffb ")
    console.log("City Search Query Sring is: https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=city ")
    // API key: e012fbc5ba9141b98a8748d19623cffb from OpenWeatherMap
    // var myQueryAPI = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=city"

    saveCitiesSearched(citiesKeyValObjList);
    var myQueryAPI = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=" + city;
    console.log("myQueryAPI is: ", myQueryAPI);
    
    $.ajax({
        url: myQueryAPI,
        method: "GET"
    }).then(function(data){
        console.log("current query url is: ", myQueryAPI); // URL query request for weather data
        console.log("weather data received from request url : ", data); // object data received from request

    });
    
  }
  









// this will run when the DOM has been loaded and ready to be acted on by Javascript
$(document).ready(function() {
    // assign any current localStorage
    var citiesKeyValObjListStringified = localStorage.getItem("citiesKeyValObjList");
    // un-Stringify localStorage back to object form
    var citiesKeyValObjList = JSON.parse(citiesKeyValObjListStringified);
    // if no localStorage exists, make object for weather data storage
            if (citiesKeyValObjList == null) {
                citiesKeyValObjList = {};
            }
    saveCitiesSearched(citiesKeyValObjList);
    console.log("citiesKeyValObjList contents is currently: ", citiesKeyValObjList);
    // hide previous city forcast when page loads
    $("cityWeather").hide();
    $("#fiveDayForecast").hide();
    // 
    // when you click on the button - check to see if empty or has a city typed inside
    $("#searchCityWeatherButn").on("click", function(event) {
      event.preventDefault();  // don't submit to any server
      var city = $("#userInput").val().trim().toLowerCase();  // returns the input value, removes white space an toLowerCase for clean search
      console.log("current city clicked on is: ", city);
      // check if something is in "userInput" first - then set it to true and localStorage it & stringify at the same time 
      if (city != "") {      
        citiesKeyValObjList[city] = true;
        // citiesKeyValObjList.city = true;
        localStorage.setItem("citiesKeyValObjList", JSON.stringify(citiesKeyValObjList));
      // function call to that makes a query to find the weather and puts info into the bootstrap cards
      getWeatherData(city, citiesKeyValObjList);
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
      getWeatherData(city, citiesKeyValObjList);
      // show in the HTML current searched city weather
      $("cityWeather").show();
      $("#fiveDayForecast").show();
    });
  });