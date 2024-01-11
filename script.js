// const input = document.getElementById("locationInput");
document.getElementById("locationInput").addEventListener('change',async()=>{
    //get the user entered location
    const location = document.getElementById("locationInput").value;

    //fetch the weather data
    const weatherData = await getWeatherData(location);

    //display weather data on the page
    displayWeatherData(weatherData);
});

const getWeatherData = async(location)=>{
    if(!location){
        return {};
    }

    const apiKey = 'c5c4bdabaee490747317d82b5e98b697';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

function getBackgroundColor(temperature){
    if(temperature<=0){
        return 'lightblue'
    }
    else if(temperature<11){
        return 'lightgreen'
    }
    else if(temperature<21){
        return 'lightyellow'
    }
    else if(temperature<31){
        return 'lightsalmon'
    }
    else{
        return 'lightcoral'
    }
}

const displayWeatherData = (data)=>{
    const weatherDataElement = document.getElementById("weatherData");

    if(Object.keys(data).length === 0){
        weatherDataElement.innerHTML = "Please enter a location to see the weather.";
    }
    else{
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp-273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${Math.floor(data.main.temp-273.15)}°C</p>
        <p>Wind Speed: ${data.wind.speed}m/s</p>
        `
    }
}

window.onload = async()=>{
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}