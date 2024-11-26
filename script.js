// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name!');
    }
});

async function getWeather(city) {
    // Use the Geocoding API to get the city coordinates
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    try {
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            throw new Error('City not found. Please check the spelling and try again.');
        }

        const { lat, lon, name, country } = geoData[0];

        // Fetch weather using latitude and longitude
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        displayWeather(name, country, weatherData);
    } catch (error) {
        document.getElementById('city-name').textContent = error.message;
        document.getElementById('temperature').textContent = '';
        document.getElementById('description').textContent = '';
    }
}

function displayWeather(cityName, country, data) {
    const temp = data.main.temp;
    const desc = data.weather[0].description;

    document.getElementById('city-name').textContent = `City: ${cityName}, ${country}`;
    document.getElementById('temperature').textContent = `Temperature: ${temp}°C`;
    document.getElementById('description').textContent = `Weather: ${desc}`;
}
