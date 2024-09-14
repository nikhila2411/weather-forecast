const container = document.querySelector('.container');
const search = document.querySelector('.searchbox button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = 'fb8f0066192100e1233b0390bfc936b9';
    const city = document.querySelector('.searchbox input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            
            if (!json || !json.main || !json.weather || !json.weather[0] || !json.wind) {
                throw new Error('Invalid API response structure');
            }

            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const windspeed = document.querySelector('.weather-details .windspeed span');

            if (cityHide.textContent !== city) {
                cityHide.textContent = city;
                container.style.height = '555px';
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');
            }

            console.log('Weather condition:', json.weather[0].main);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/70.png';
                    break;
                case 'Rain':
                case 'Heavy Intensity Rain':
                case 'Very Heavy Rain':
                case 'Extreme Rain':
                case 'Freezing Rain':
                case 'Heavy Intensity Shower Rain':
                case 'Ragged Shower Rain':
                    image.src = 'images/40.png';
                    break;
                case 'Light Rain':
                case 'Moderate Rain':
                case 'Light Intensity Shower Rain':
                case 'Shower Rain':
                    image.src = 'images/211.png';
                    break;
                case 'Snow':
                    image.src = 'images/30.png';
                    break;
                case 'Clouds':
                    if (json.weather[0].description.includes('few')) {
                        image.src = 'images/61.png';
                    } else if (json.weather[0].description.includes('scattered')) {
                        image.src = 'images/91.png';
                    } else if (json.weather[0].description.includes('broken')) {
                        image.src = 'images/8.png';
                    } else {
                        image.src = 'images/8.png'; 
                    }
                    break;
                case 'Thunderstorm':
                case 'Thunderstorm with Light Rain':
                case 'Thunderstorm with Rain':
                case 'Thunderstorm with Heavy Rain':
                case 'Light Thunderstorm':
                case 'Heavy Thunderstorm':
                case 'Ragged Thunderstorm':
                case 'Thunderstorm with Light Drizzle':
                case 'Thunderstorm with Drizzle':
                case 'Thunderstorm with Heavy Drizzle':
                    image.src = 'images/20.png';
                    break;
                case 'Mist':
                case 'Haze':
                case 'Fog':
                    image.src = 'images/100.png';
                    break;
                case 'Drizzle':
                case 'Light Intensity Drizzle':
                case 'Heavy Intensity Drizzle':	 
                case 'Drizzle Rain':
                case 'Heavy Intensity Drizzle Rain':	
                case 'Shower Rain and Drizzle':
                case 'Heavy Shower Rain and Drizzle':	 
                case 'Shower Drizzle':
                    image.src = 'images/111.png';
                    break;
                default:
                    image.src = 'images/91.png'; 
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1);
            humidity.innerHTML = `${json.main.humidity}%`;
            windspeed.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
        })
        .catch(err => {
            console.error("Error fetching weather data: ", err);
            alert("An error occurred: " + err.message);
        });
});
