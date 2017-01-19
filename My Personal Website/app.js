function loadDate() {
  var currentDate = new Date();
  var dateString = currentDate.toString()
                     .split(" ")
                     .splice(0, 4)
                     .join(" ");

  $("#date").text(dateString);
}

function loadWeather() {
  var weather = $("#weather");
  var url = "https://api.forecast.io/forecast/";
  var apiKey = "f2ba4574815a158914915a04c63af0f2";

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
      weather.text("Based On Your Current Location, It Ss " + data.currently.temperature + "° F Right Now.");
    });
  }

  function error() {
    alert("Unable To Retrieve Your Location Forr Weather.");
  }

  navigator.geolocation.getCurrentPosition(success, error);

  weather.text("Fetching Your Weather...");
}

function loadNews() {
  var news = $("#news");
  var url = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=";
  var apiKey = "a5b3dc33b2544321be253745736cbe17";

  $.getJSON(url + apiKey, function(data) {
    var titles = data.articles.map(function(articles) {
      return "<a href='" + articles.url + "'>" + articles.title + "</a>";
    });

    news.html(titles.join("<br><br>"));
  });

  news.text("Fetching The Latest News...");
}

loadDate();
loadWeather();
loadNews();