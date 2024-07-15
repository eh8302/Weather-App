const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

const getWeather = (city) => {
    document.getElementById('cityname').innerText = city;
    
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const response = JSON.parse(this.responseText);
                let temp = response.main.temp;
                let feels_like = response.main.feels_like;
                let temp_min = response.main.temp_min;
                let temp_max = response.main.temp_max;
                const pressure = response.main.pressure;
                const humidity = response.main.humidity;
                const speed = response.wind.speed;
                const deg = response.wind.deg;
                const visibility = response.visibility;

                // Assuming the API returns temperatures in Fahrenheit, convert them to Celsius
                temp = (temp - 32) * 5 / 9;
                feels_like = (feels_like - 32) * 5 / 9;
                temp_min = (temp_min - 32) * 5 / 9;
                temp_max = (temp_max - 32) * 5 / 9;

                document.getElementById('temp').innerText = temp.toFixed(2);
                document.getElementById('feels_like').innerText = feels_like.toFixed(2);
                document.getElementById('temp_min').innerText = temp_min.toFixed(2);
                document.getElementById('temp_max').innerText = temp_max.toFixed(2);
                document.getElementById('pressure').innerText = pressure;
                document.getElementById('humidity').innerText = humidity;
                document.getElementById('speed').innerText = speed;
                document.getElementById('deg').innerText = deg;
                document.getElementById('visibility').innerText = visibility;

                console.log(`Temp: ${temp}, Feels Like: ${feels_like}, Temp Min: ${temp_min}, Temp Max: ${temp_max}, Pressure: ${pressure}, Humidity: ${humidity}, Speed: ${speed}, Deg: ${deg}, Visibility: ${visibility}`);
            } else {
                console.error('Error:', this.statusText);
            }
        }
    });

    xhr.open('GET', `https://open-weather13.p.rapidapi.com/city/${city}/EN`);
    xhr.setRequestHeader('x-rapidapi-key', 'API-Key'); // Replace with your API key
    xhr.setRequestHeader('x-rapidapi-host', 'open-weather13.p.rapidapi.com');
    xhr.send(data);
};

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);
});

getWeather('Delhi');

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (event) => {
        const city = event.target.textContent;
        getWeather(city);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    cities.forEach(city => {
        getWeather(city);
    });
});

document.querySelector('.nav-link[href="#about"]').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});
