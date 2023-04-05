//To get live date, day and time
function updateClock() {
  // To get the current date and time
  var now = new Date();

  // To get the hours, minutes, and seconds
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // To get the date components
  var year = now.getFullYear();
  var monthIndex = now.getMonth();
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var monthName = monthNames[monthIndex];
  var day = now.getDate();
  var dayIndex = now.getDay();
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var dayName = dayNames[dayIndex];

  // To format the time string as hh:mm:ss
  var timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

  // To format the date string as Day, Month Day, Year
  var dateString = dayName + ', ' + monthName + ' ' + day.toString().padStart(2, '0') + ', ' + year;

  // To update the clock and date elements with the formatted time and date strings
  document.getElementById("time").innerHTML = timeString;
  document.getElementById("date").innerHTML = dateString;
}

// Call the updateClock function once to set the initial time and date
updateClock();

// Refresh the clock and date every second using setInterval
setInterval(updateClock, 1000);



  
// Function to update the weather data based on the city name
function updateWeatherData(cityName) {
  const API_KEY = '3a449ca4202378f373da2d6f18fbf37e';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Update the HTML elements with the weather data
      document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
      document.querySelector('.cityName_and_Country').innerHTML = `${data.name}, ${data.sys.country}`;
      document.querySelector('.weather-condition').innerHTML = data.weather[0].description;
      document.querySelector('.Humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
      document.querySelector('.Real_feels').innerHTML = `Feels like: ${Math.round(data.main.feels_like)}&deg;C`;
      document.querySelector('.Wind-Speed').innerHTML = `Wind speed: ${data.wind.speed} m/s`;
      document.querySelector('.Pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;

      // Update the weather icon
      const weatherIcon = document.querySelector('.weather_icon');
      const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;
    })
    .catch(error => {
      console.log(error);
      alert('Unable to retrieve weather data. Please try again.');
    });
}

// Call the updateWeatherData function with the default city name (Huntsville) when the page loads
updateWeatherData('Huntsville');

// Add event listener to the search button
const searchBtn = document.querySelector('button[type="submit"]');
const searchInput = document.querySelector('#search');

searchBtn.addEventListener('click', () => {
  const cityName = searchInput.value;
  updateWeatherData(cityName);
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const cityName = searchInput.value;
    updateWeatherData(cityName);
  }
});





// Function to change background image based on weather condition 
function changeBackgroundImage(cityName) {
  // Set default city name to Huntsville if cityName is not provided
  cityName = cityName || 'Huntsville';

  // Make API call to fetch weather data for the city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3a449ca4202378f373da2d6f18fbf37e`)
    .then(response => response.json())
    .then(data => {
      // Get the weather condition from the API response
      const weatherCondition = data.weather[0].main.toLowerCase();

      // Set the background image based on the weather condition
      switch (weatherCondition) {
        case 'clear':
          document.getElementById('background').src = 'Pragya_Aryal_22329229_clear.jpg';
          break;
        case 'clouds':
          document.getElementById('background').src = 'Pragya_Aryal_22329229_cloudy.jpg';
          break;
        case 'rain':
          document.getElementById('background').src = 'Pragya_Aryal_22329229_rainy.jpg';
          break;
        case 'snow':
          document.getElementById('background').src = 'Pragya_Aryal_22329229_snowy.jpg';
          break;
        default:
          document.getElementById('background').src = 'Pragya_Aryal_22329229_default.jpg';
      }
    })
    .catch(error => console.log(error));
}

// Call the changeBackgroundImage function with default city "Huntsville" when the page loads
window.onload = () => {
  changeBackgroundImage();
};




// Get the search input field and search button
const searchInput3 = document.querySelector('#search');
const searchButton = document.querySelector('.search_bar button');

// Add event listener to the search button to get the city name from the search bar and call the changeBackgroundImage function with that city name
searchButton.addEventListener('click', () => {
  const cityName = searchInput3.value;
  changeBackgroundImage(cityName);
});

// Add event listener to the search input field for the "Enter" key
searchInput3.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const cityName = searchInput3.value;
    changeBackgroundImage(cityName);
  }
});



  





//Channging image according to the city

const searchInput2 = document.getElementById('search');
const cityImage = document.querySelector('.cityimage img');

// Function to fetch city image from Pexels API
async function fetchCityImage(city) {
  const apiKey = 'lE48G6WED7cuQUfGoeKew6Z89Adg9rHEg17kvtimukM1ChAsE3yrDyIl';
  const url = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;
  const response = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  });
  const data = await response.json();
  return data.photos[0].src.medium;
}

// Event listener for search input
searchInput2.addEventListener('change', async (event) => {
  const city = event.target.value;
  const imageUrl = await fetchCityImage(city);
  cityImage.src = imageUrl;
});


