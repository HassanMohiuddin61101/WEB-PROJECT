document.getElementById('send-chat-btn').addEventListener('click', function() {
    let userQuery = document.getElementById('chat-input').value.toLowerCase();
    let chatOutput = document.getElementById('chat-output');
    let apiKey = 'b4636d5eabfd0611c27593da73c9e4df';
    let city = 'Islamabad';

    function filterAndSortForecast(forecasts) {
        let ascendingTemps = forecasts.sort((a, b) => a.main.temp - b.main.temp);
        console.log("Temperatures in Ascending Order: ", ascendingTemps);
        let descendingTemps = forecasts.sort((a, b) => b.main.temp - a.main.temp);
        console.log("Temperatures in Descending Order: ", descendingTemps);
        let rainyDays = forecasts.filter(forecast => forecast.weather[0].description.includes('rain'));
        console.log("Rainy Days: ", rainyDays);
        let hottestDay = forecasts.reduce((max, forecast) => max.main.temp > forecast.main.temp ? max : forecast);
        console.log("Hottest Day: ", hottestDay);
    }

    if (userQuery.includes('5-day forecast') || userQuery.includes('week forecast')) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let forecastHtml = `<p>5-Day Forecast for ${data.city.name}:</p>`;
            let forecasts = [];
            data.list.forEach((forecast, index) => {
                if (index % 8 === 0) {
                    forecasts.push(forecast);
                    forecastHtml += `<p>Day ${Math.floor(index / 8) + 1}: ${forecast.dt_txt} - ${forecast.weather[0].description}, Temp: ${forecast.main.temp}°C</p>`;
                }
            });
            chatOutput.innerHTML += `<p>User: ${userQuery}</p><p>Bot: ${forecastHtml}</p>`;
            filterAndSortForecast(forecasts);
        })
        .catch(error => {
            chatOutput.innerHTML += `<p>Bot: I couldn't fetch the 5-day forecast. Try again.</p>`;
        });
    } else if (userQuery.includes('weather') || userQuery.includes('forecast')) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let weatherResponse = `The weather in ${data.name} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
            chatOutput.innerHTML += `<p>User: ${userQuery}</p><p>Bot: ${weatherResponse}</p>`;
        })
        .catch(error => {
            chatOutput.innerHTML += `<p>Bot: I couldn't fetch the weather. Try again.</p>`;
        });
    } else if (userQuery.includes('rain') || userQuery.includes('rainy')) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let rainResponse = data.rain ? `It is raining in ${data.name}.` : `No rain in ${data.name}.`;
            chatOutput.innerHTML += `<p>User: ${userQuery}</p><p>Bot: ${rainResponse}</p>`;
        })
        .catch(error => {
            chatOutput.innerHTML += `<p>Bot: I couldn't fetch the rain information. Try again.</p>`;
        });
    } else if (userQuery.includes('humidity')) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let humidityResponse = `The humidity in ${data.name} is ${data.main.humidity}%.`;
            chatOutput.innerHTML += `<p>User: ${userQuery}</p><p>Bot: ${humidityResponse}</p>`;
        })
        .catch(error => {
            chatOutput.innerHTML += `<p>Bot: I couldn't fetch the humidity data. Try again.</p>`;
        });
    } else if (userQuery.includes('clouds') || userQuery.includes('cloudy')) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let cloudsResponse = `Cloud cover in ${data.name} is ${data.clouds.all}%.`;
            chatOutput.innerHTML += `<p>User: ${userQuery}</p><p>Bot: ${cloudsResponse}</p>`;
        })
        .catch(error => {
            chatOutput.innerHTML += `<p>Bot: I couldn't fetch the cloud information. Try again.</p>`;
        });
    } else if (userQuery.includes('sunny') || userQuery.includes('hot')) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            let sunnyResponse = data.weather[0].description.includes('sun') ? `It is sunny in ${data.name}.` : `It is not sunny in ${data.name}.`;
            chatOutput.innerHTML += `<p>User: ${userQuery}</p><p>Bot: ${sunnyResponse}</p>`;
        })
        .catch(error => {
            chatOutput.innerHTML += `<p>Bot: I couldn't fetch the weather. Try again.</p>`;
        });
    } else {
        chatOutput.innerHTML += `<p>User: ${userQuery}</p><p>Bot: I can only answer weather-related queries.</p>`;
    }
    document.getElementById('chat-input').value = '';
});
