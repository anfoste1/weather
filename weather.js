$(function() {
  var handleWeatherResponse = function(data) {
    console.log(data);

    // Put your code here to change the "markup" variable.
    // Don't change any other code in this file. You will be sad.

    var markup =
      "<p> Current Weather: " + data.currently.temperature + "&deg; " + data.currently.summary +
      "<p> Tomorrow: " + "High - " + data.daily.data[0].temperatureMax + "&deg;, " + "Low - " +data.daily.data[0].temperatureMin + "&deg;, " + data.daily.data[0].summary +
      "<p> The Day After Tomorrow: " + "High - " + data.daily.data[1].temperatureMax + "&deg;, " + "Low - " + data.daily.data[1].temperatureMin + "&deg;, " + data.daily.data[1].summary +
      "<p> The Day After the Day After Tomorrow: " + "High - " + data.daily.data[2].temperatureMax + "&deg;, " + "Low - " + data.daily.data[1].temperatureMin + "&deg;, " + data.daily.data[2].summary;

    // End of your code

    $('.weather-report').html(markup);
  }
  $('a.get-the-weather').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: 'https://api.forecast.io/forecast/6dbe98374cc5b8f9ea63d5ec73de9c04/42.056459,-87.675267?callback=?',
      dataType: 'jsonp',
      contentType: "application/json",
      success: handleWeatherResponse
    });
  });
});
