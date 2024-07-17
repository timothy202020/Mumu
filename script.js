document.getElementById('search-btn').addEventListener('click', handleSearchClick);

function handleSearchClick() {
    const city = getCityInput();
    if (city) {
        fetchWeatherData(city)
            .then(displayWeather)
            .catch(handleError);
    }
}

function getCityInput() {
    return document.getElementById('city-input').value;
}

async function fetchWeatherData(city) {
    const apiKey = '643edc50fddd59596c9720c56229408d'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather for: ${city}`);
    console.log(`Request URL: ${url}`);

    const response = await fetch(url);
    console.log('Response:', response);

    if (!response.ok) {
        throw new Error('City not found');
    }

    return response.json();
}

function displayWeather(weatherData) {
    const { name: cityName, main: { temp: temperature }, weather } = weatherData;
    const weatherDescription = weather[0].description;

    document.getElementById('city-name').textContent = `Weather in ${cityName}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('weather').textContent = `Condition: ${weatherDescription}`;
}

function handleError(error) {
    console.error('Error fetching weather data:', error);
    alert(error.message);
}
