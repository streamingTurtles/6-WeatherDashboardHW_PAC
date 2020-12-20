
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
  
  




// function to get data using API calls - to build out:
function getWeatherData(city, citiesKeyValObjList) {
    
    console.log("Here is a Cookie: streaming turtles are cool! ");
    // console.log("My API Key from OpenWeatherMap is: e012fbc5ba9141b98a8748d19623cffb ")
    console.log("City Search Query Sring is: https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=city ")
    var myAPIkey= "e012fbc5ba9141b98a8748d19623cffb"; //from OpenWeatherMap
    //
    // for UV data - seperate Ajax query needed
    // https://openweathermap.org/api/uvi  - documentation
    var longitude; // variable needed for the extra data needed for UV query string
    var latitude ; // variable needed for the extra data needed for UV query string


    saveCitiesSearched(citiesKeyValObjList);
    // API query string to get the weather object
    // var myQueryAPI = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=city"
    var myQueryAPI = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q=" + city;
    console.log("myQueryAPI is: ", myQueryAPI);

            // 1. Top Line Weather
            // https://openweathermap.org/current - documentation for API call for Current Weather
            // weather data query
            $.ajax({
                url: myQueryAPI,
                method: "GET"
            }).then(function(weather){  // pass in weather object from return of the myQueryAPI call
                // using dayJS - show current time dayjs().format() 
                // console.log("Today is: ", dayjs().format('dddd, MMMM D YYYY' +  ' h mm A'));
                console.log("Today is: ", dayjs().format('dddd, MMMM D YYYY' +  ' h:mm A'));
                var currentDateTime = dayjs().format('ddd, M/D/YYYY');
                console.log(currentDateTime);
                console.log("current query url is: ", myQueryAPI); // URL query request for weather data
                console.log("weather data received from request url : ", weather); // object data received from request
                // adding the City name to render in the html from the weather object - placement in id=#cityName
                var showDate = $("<h4>"); // jQuery, go make me a h4 tag, & create variable to store element object to render in html markup
                $("#cityName").empty(); // clear any preExisting data
                $("#cityName").append(showDate.text(currentDateTime)); // jQuery, go find id and add date into its html tag the id lives
                var showCity = $("<h4>").text(weather.name); // create variable to store object property weather.name to render in html markup
                $("#cityName").prepend(showCity)// jQuery, go find id in html and now render in html markup in the beginning of selected tag
                // adding the City weather icon to render in the html from the weather object - placement in id=#cityWeatherIcon
                // https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon - FYI: how to overview to implement rendering the icon
                var showIcon = $("<img>").attr("src","https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png");
                $("#cityWeatherIcon").empty(); // clear any preExisting data
                $("#cityWeatherIcon").append(showIcon); // render to html at id = #cityWeatherIcon
                // adding in the temperature, humidity, windSpeed & UV index
                $("#cityTemp").text("Current Temperature is: " + weather.main.temp + " °F");
                $("#cityHumidity").text("Current Humidity is: " + weather.main.humidity + "%");
                $("#cityWind").text("Current Wind Speed is: " + weather.wind.speed + " MPH");  
        

                // 2. UV index:
                // https://openweathermap.org/api/uvi  - documentation for API call for UV Index
                // UV index is a different API query that requires the Longitude & Latitude coordinates:
                // needs another Ajax call to get this data
                longitude = weather.coord.lon; // set variable using coor.lon in the weather object from initial myQueryAPI call
                latitude  = weather.coord.lat; // set variable using coor.lon in the weather object from initial myQueryAPI call
                console.log("longitude & latitude data is: ", longitude, latitude);
                // https://openweathermap.org/api/uvi  - documentation
                // concatenate Longitude & Latitude to updated API call for UV data
                var UVQueryAPI = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+latitude+"&lon="+longitude+"&appid="+myAPIkey;
                console.log("UVQueryAPI is: ", UVQueryAPI);
                // now make another ajax call:
                $.ajax({
                    url: UVQueryAPI,  // silly typo - url cannont be URL - it throws aAccess to XMLHttpRequest from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.
                    method: "GET"
                }).then (function(uvIndex){  // UV Index data for our promise function to work on
                    console.log("UV data object is: ", uvIndex);
                    console.log("UVIndex array at sample time positions: 0,1,2,3,4,5,6,7: ", uvIndex[0].value +', '+
                                                                                                uvIndex[1].value +', '+
                                                                                                uvIndex[2].value +', '+
                                                                                                uvIndex[3].value +', '+
                                                                                                uvIndex[4].value +', '+
                                                                                                uvIndex[5].value +', '+
                                                                                                uvIndex[6].value );
                    $("#cityUV").text("Current UV index is: " + uvIndex[3].value);
                    // To do: 
                    // to add background color (using CSS) to text area, indicating favorable, moderate, or severe 
                    // build out conditional if statement that decides what is favorable, moderate, or severe - need to look up 
                    // favorable, moderate, or severe UV ranges. 

               
                        // 3. Five Day Forcast:
                        // https://openweathermap.org/forecast5 - documentation for API call for 5-day forcast
                        var fiveDayForecastAPI = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=e012fbc5ba9141b98a8748d19623cffb&q="+city;
                                                    
                        console.log("The 5 Day forcast API call is: ", fiveDayForecastAPI);
                        // now make another ajax call:
                        $.ajax({
                            url: fiveDayForecastAPI,
                            method: "GET"                    
                        }).then (function(forecast){ // what is coming into this function when the promise resolves, store in fiveDayForcast object
                            console.log("The 5 Day forcast object from API is: ", forecast);
                            // 5 day forcast array represents weather data every 3hrs, I will target noon-time for each day of the 5 day forcast
                            // The loop will match noon time for each day given that each day is divided by 3hr intervals as show in the 0-39 indexed forcast.list array
                            for (var i=0; i < forecast.list.length; i+=8){
                                 var day = $("<h6>"); // jQuery make tag, put in day
                                 var num = (i + 8)/8; // fudge num value so that it counts from 1 to 5 to match its id attribute date1,2,3,4,5
                                 var numForDate = (i+8)-3; // puts me in the middle of the day at 3:00pm
                                //  if (numForDate = 40){numForDate=39}
                                 console.log("check that our loop counts correctly - its day: ", "date" + num);
                                 $("#date" + num).empty(); // 
                                 //  $("#date" + num).append(day.text(currentDateTime.add(1,"days").format("m/d/yyyy")));
                                //  $("#date" + num).append(day.text(currentDateTime));
                                console.log("num is: ", num);
                                console.log("numForDate is: ", numForDate);
                                console.log("date is: ", forecast.list[numForDate].dt_txt);
                                 $("#date" + num).append(forecast.list[numForDate].dt_txt);
                            };
                        })
                

                                                                                                                
                });




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