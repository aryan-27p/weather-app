        async function getWeather() {
            const city = document.getElementById('cityInput').value.trim();
            const resultDiv = document.getElementById('weatherResult');
            if (!city) {
                resultDiv.innerHTML = '<span style="color:red;">Please enter a city name.</span>';
                return;
            }
            resultDiv.innerHTML = 'Loading...';
            try {
               
                const apiKey = 'b6d30fa31fc50ed8dd80f120aac94678';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
                const response = await fetch(url);
                if (!response.ok) {
                    resultDiv.innerHTML = '<span style="color:red;">City not found.</span>';
                    return;
                }
                const data = await response.json();
                const weather = data.weather[0].main;
                const temp = data.main.temp;
                const iconMap = {
                    'Clouds': '<i class="fas fa-cloud"></i>',
                    'Rain': '<i class="fas fa-cloud-showers-heavy"></i>',
                    'Drizzle': '<i class="fas fa-cloud-sun-rain"></i>',
                    'Clear': '<i class="fas fa-cloud-sun"></i>',
                    'Thunderstorm': '<i class="fas fa-bolt"></i>',
                    'Snow': '<i class="fas fa-snowflake"></i>',
                    'Mist': '<i class="fas fa-smog"></i>'
                };
                resultDiv.innerHTML = `
                    <div style="font-size:2rem;">${iconMap[weather] || '<i class="fas fa-cloud"></i>'}</div>
                    <div><strong>${data.name}</strong></div>
                    <div>${weather}</div>
                    <div>Temperature: ${temp} &deg;C</div>
                `;
            } catch (error) {
                resultDiv.innerHTML = '<span style="color:red;">Error fetching weather.</span>';
            }
        }
    