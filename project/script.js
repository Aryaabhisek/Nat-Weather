document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const cityInput = document.getElementById('city-input');
    const weatherData = document.getElementById('weather-data');
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');
    
    // API configuration
    // const API_KEY = process.env.API_KEY;
    // const API_URL = process.env.API_URL;

    
    // Default city
    fetchWeather('Bhubaneswar');
    
    // Event listener for form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
    
    // Function to fetch weather data
    function fetchWeather(city) {
        // Show loading, hide previous data and errors
        loading.classList.remove('hidden');
        weatherData.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Fetch data from API
        fetch(`${process.env.API_URL}?key=${process.env.API_KEY}&q=${city}&aqi=no`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }
    
    // Function to display weather data
    function displayWeather(data) {
        const { location, current } = data;
        
        // Update DOM elements with weather data
        document.getElementById('city-name').textContent = `${location.name}, ${location.country}`;
        document.getElementById('temperature').textContent = `${current.temp_c}°C`;
        document.getElementById('weather-condition').textContent = current.condition.text;
        document.getElementById('weather-icon').src = `https:${current.condition.icon}`;
        document.getElementById('wind-speed').textContent = `${current.wind_kph} km/h`;
        document.getElementById('humidity').textContent = `${current.humidity}%`;
        
        // Hide loading, show weather data with animation
        loading.classList.add('hidden');
        weatherData.classList.remove('hidden');
        weatherData.classList.add('fade-in');
        
        // Clear input field
        cityInput.value = '';
    }
    
    // Function to show error message
    function showError(message) {
        loading.classList.add('hidden');
        document.getElementById('error-text').textContent = message;
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('fade-in');
    }
});