let weatherContainer = document.querySelector(".weather-container");
let locationEl = document.querySelector(".location-time");
let logoTempEl = document.querySelector(".logo-temp");
let weatherInfoEl = document.querySelector(".weather-info");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");
let uvIndex = document.querySelector(".index-number");
let userInput = document.querySelector(".user-input");
let searchButton = document.querySelector(".search-btn");
let daysContainer = document.querySelectorAll(".container");
let rightContainer = document.querySelector(".right");
let savedButtons = document.querySelector(".saved-button");

function convertToFah(kelvin) {
  let convertedTemp = 1.8 * (kelvin - 273) + 32;
  return convertedTemp;
}

let cityNames = [];

function getWeather(test) {
  userInputValue = document.querySelector(".user-input").value;

  userInputValue = userInputValue.toLowerCase();

  if (userInputValue) saveData(userInputValue);

  if (test) {
    userInputValue = test;
  }

  if (userInputValue === "") {
    userInputValue = "los%20angeles";
  }

  locationEl.textContent = "Los Angeles , California";

  if (userInputValue.length > 1) {
    userInputValue.split(" ").join("%20");
  } else {
    return userInputValue;
  }

  requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    userInputValue +
    "&appid=0ca6859b636893d65ad340a16c3102a5";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let lat = data[0].lat;
      let lon = data[0].lon;
      let latLon = "lat=" + lat + "&lon=" + lon;
      let cityState = data[0].name + " , " + data[0].state;
      locationEl.textContent = cityState;
      console.log(latLon);

      let anotherUrl =
        "https://api.openweathermap.org/data/2.5/onecall?" +
        latLon +
        "&appid=0ca6859b636893d65ad340a16c3102a5";
      return fetch(anotherUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let apiData = data.current;

      if (apiData.weather[0].main === "Clouds") {
        let weatherIcon = document.createElement("img");
        weatherIcon.setAttribute(
          "src",
          "assets/images/weather-icons/cloudy.svg"
        );
        weatherIcon.classList.add("main-icon");
        logoTempEl.append(weatherIcon);
      } else if (apiData.weather[0].main === "Clear") {
        let weatherIcon = document.createElement("img");
        weatherIcon.setAttribute(
          "src",
          "assets/images/weather-icons/clear.svg"
        );
        weatherIcon.classList.add("main-icon");
        logoTempEl.append(weatherIcon);
      } else if (
        apiData.weather[0].main === "Mist" ||
        "Smoke" ||
        "Haze" ||
        "Dust" ||
        "Fog" ||
        "Sand" ||
        "Dust" ||
        "Ash" ||
        "Squall" ||
        "Tornado"
      ) {
        let weatherIcon = document.createElement("img");
        weatherIcon.setAttribute(
          "src",
          "assets/images/weather-icons/atmosphere.svg"
        );
        weatherIcon.classList.add("main-icon");
        logoTempEl.append(weatherIcon);
      } else if (apiData.weather[0].main === "Snow") {
        let weatherIcon = document.createElement("img");
        weatherIcon.setAttribute("src", "assets/images/weather-icons/snow.svg");
        weatherIcon.classList.add("main-icon");
        logoTempEl.append(weatherIcon);
      } else if (apiData.weather[0].main === "Thunderstorm") {
        let weatherIcon = document.createElement("img");
        weatherIcon.setAttribute(
          "src",
          "assets/images/weather-icons/thunderstorms.svg"
        );
        weatherIcon.classList.add("main-icon");
        logoTempEl.append(weatherIcon);
      } else if (apiData.weather[0].main === "Drizzle") {
        let weatherIcon = document.createElement("img");
        weatherIcon.setAttribute(
          "src",
          "assets/images/weather-icons/drizzle.svg"
        );
        weatherIcon.classList.add("main-icon");
        logoTempEl.append(weatherIcon);
      } else if (apiData.weather[0].main === "Rain") {
        let weatherIcon = document.createElement("img");
        weatherIcon.setAttribute("src", "assets/images/weather-icons/rain.svg");
        weatherIcon.classList.add("main-icon");
        logoTempEl.append(weatherIcon);
      } else {
        return;
      }

      const currentTime = apiData.dt * 1000 - data.timezone_offset;

      let currentDate = new Date(currentTime);

      let dateOnly = moment
        .tz(currentDate, data.timezone)
        .format("MMMM Do YYYY, h:mm a z");

      let date = document.createElement("p");
      date.textContent = dateOnly;
      locationEl.append(date);
      let temp = convertToFah(apiData.temp);
      let temperature = document.createElement("h1");
      temperature.textContent = Math.floor(temp) + "℉";
      logoTempEl.append(temperature);
      humidity.textContent = apiData.humidity + " %";
      windSpeed.textContent = apiData.wind_speed + " mph";
      uvIndex.textContent = apiData.uvi;

      if (apiData.uvi < 3) {
        uvIndex.classList.add("green");
      } else if (apiData.uvi < 6) {
        uvIndex.classList.add("yellow");
      } else if (apiData.uvi < 8) {
        uvIndex.classList.add("orange");
      } else {
        uvIndex.classList.add("red");
      }

      for (let i = 0; i < 5; i++) {
        let bottomContainer = document.querySelector(".bottom");
        let boxContainer = document.createElement("div");
        bottomContainer.append(boxContainer);
        boxContainer.classList.add("container");
        let logoTemp = bottomContainer.children[i];
        logoTemp.classList.add("box-container" + (i + 1));
      }

      for (let j = 1; j < 6; j++) {
        let logoTemp = document.querySelector(".box-container" + j);
        let fiveDays = document.createElement("h5");
        let fiveDayDate = data.daily[j].dt * 1000 - data.timezone_offset;
        let fiveTime = new Date(fiveDayDate);
        let fiveDateOnly = moment
          .tz(fiveTime, data.timezone)
          .format("M" + "/" + "D");
        fiveDays.textContent = fiveDateOnly;
        fiveDays.classList.add("five-day");
        logoTemp.append(fiveDays);

        if (data.daily[j].weather[0].main === "Clouds") {
          let smallIcon = document.createElement("img");
          smallIcon.setAttribute(
            "src",
            "assets/images/weather-icons/cloudy.svg"
          );
          smallIcon.classList.add("side-icon");
          logoTemp.append(smallIcon);
        } else if (data.daily[j].weather[0].main === "Clear") {
          let smallIcon = document.createElement("img");
          smallIcon.setAttribute(
            "src",
            "assets/images/weather-icons/clear.svg"
          );
          smallIcon.classList.add("side-icon");
          logoTemp.append(smallIcon);
        } else if (
          data.daily[j].weather[0].main === "Mist" ||
          "Smoke" ||
          "Haze" ||
          "Dust" ||
          "Fog" ||
          "Sand" ||
          "Dust" ||
          "Ash" ||
          "Squall" ||
          "Tornado"
        ) {
          let smallIcon = document.createElement("img");
          smallIcon.setAttribute(
            "src",
            "assets/images/weather-icons/atmosphere.svg"
          );
          smallIcon.classList.add("side-icon");
          logoTemp.append(smallIcon);
        } else if (data.daily[j].weather[0].main === "Snow") {
          let smallIcon = document.createElement("img");
          smallIcon.setAttribute("src", "assets/images/weather-icons/snow.svg");
          smallIcon.classList.add("side-icon");
          logoTemp.append(smallIcon);
        } else if (data.daily[j].weather[0].main === "Thunderstorm") {
          let smallIcon = document.createElement("img");
          smallIcon.setAttribute(
            "src",
            "assets/images/weather-icons/thunderstorms.svg"
          );
          smallIcon.classList.add("side-icon");
          logoTemp.append(smallIcon);
        } else if (data.daily[j].weather[0].main === "Drizzle") {
          let smallIcon = document.createElement("img");
          smallIcon.setAttribute(
            "src",
            "assets/images/weather-icons/drizzle.svg"
          );
          smallIcon.classList.add("side-icon");
          logoTemp.append(smallIcon);
        } else if (data.daily[j].weather[0].main === "Rain") {
          let smallIcon = document.createElement("img");
          smallIcon.setAttribute("src", "assets/images/weather-icons/rain.svg");
          smallIcon.classList.add("side-icon");
          logoTemp.append(smallIcon);
        } else {
          return;
        }

        let fiveDayTemp = document.createElement("h5");
        let dayTemp = data.daily[j].temp.day;
        fiveDayTemp.textContent = Math.floor(convertToFah(dayTemp)) + "℉";
        fiveDayTemp.classList.add("five-temp");
        let fiveDayHumidity = document.createElement("p");
        fiveDayHumidity.textContent =
          "Humidity:" + data.daily[j].humidity + "%";
        fiveDayHumidity.classList.add("five-humidity");
        let fiveDayWind = document.createElement("p");
        fiveDayWind.textContent =
          "Wind Speed:" + data.daily[j].wind_speed + "mph";
        fiveDayWind.classList.add("five-wind");
        logoTemp.append(fiveDayTemp, fiveDayHumidity, fiveDayWind);
      }
    });
}

getWeather();

function saveData(recentCity) {
  // retrieve city names
  let savedCities = localStorage.getItem("cityNames");
  if (!savedCities) {
    cityNames = [];
  } else {
    cityNames = JSON.parse(savedCities);
  }

  cityNames.push(recentCity);
  localStorage.setItem("cityNames", JSON.stringify(cityNames));
}

function createButtons() {
  let savedCities = localStorage.getItem("cityNames");
  if (!savedCities) {
    cityNames = [];
  } else {
    cityNames = JSON.parse(savedCities);
  }
  console.log(cityNames);

  if (cityNames !== "") {
    savedButtons.textContent = "";
    for (let i = 0; i < cityNames.length; i++) {
      let cityButton = document.createElement("button");

      cityButton.textContent = cityNames[i];
      cityButton.setAttribute("data-city", cityNames[i]);
      cityButton.classList.add("saved-btn");

      savedButtons.append(cityButton);
    }
  }
}

createButtons();

savedButtons.addEventListener("click", function (event) {
  let element = event.target;

  if (element.matches("button") === true) {
    let currentCity = element.getAttribute("data-city");

    let removeContent = document.querySelector(".bottom");
    removeContent.textContent = "";
    logoTempEl.textContent = "";

    getWeather(currentCity);
  }
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  let removeContent = document.querySelector(".bottom");
  removeContent.textContent = "";
  logoTempEl.textContent = "";
  getWeather();
  createButtons();
  console.log(cityNames);
});
