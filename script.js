const weather_apikey = "d4bae4654377c77cb09c335d16c2f373"

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");




const url = (city) => 'https://api.openweathermap.org/data/2.5/weather?zip='+ city + ',US&appid=' + weather_apikey + '&units=imperial';

async function getWeatherByLocation(city)
{
    const resp = await fetch(url(city), {origin: "cors"});
    const respData = await resp.json();

    console.log(respData);

    addWeathertoPage(respData);
    windAdvisory(respData);
}

function addWeathertoPage(data)
{
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const weather = document.createElement("div");
    weather.className = "flex justify-center";
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2 class = "flex justify-center><img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" /> ${temperature}°F <img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png" /></h2>
        <medium class = "flex - justify-center>${data.weather[0].main}</medium>
        <div class="more-info">
        <p>Humidity : <span>${humidity}%</span></p>
        <hr>
        <p>Wind speed : <span>${+Math.trunc(windSpeed * 3.16)}km/h</span></p>
        </div>
    `;

    result.appendChild(weather);
}

// function KtoF(K)
// {
//     return Math.floor((K-273.5) * (9/5));
// }

form.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const city = search.value;

    if (city)
    {
        getWeatherByLocation(city);
    }
})


function windAdvisory(data)
{
    const windSpeed = data.wind.speed;
    let advisory = document.createElement('div');
    if (windSpeed > 10)
    {
        advisory.className = 'bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
        advisory.role = 'alert'
        advisory.innerHTML = '<p class="font-bold">DO NOT SAIL</p>'
        result.appendChild(advisory);
    }
    else
    {
        advisory.className = 'bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
        advisory.role = 'alert'
        advisory.innerHTML = '<p class="font-bold">HAPPY SAILING!</p>'
        result.appendChild(advisory);
    }
}