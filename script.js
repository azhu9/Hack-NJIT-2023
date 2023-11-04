const apikey = "d4bae4654377c77cb09c335d16c2f373"

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");




const url = (city) => 'https://api.openweathermap.org/data/2.5/weather?zip='+ city + ',US&appid=' + apikey;

async function getWeatherByLocation(city)
{
    const resp = await fetch(url(city), {origin: "cors"});
    const respData = await resp.json();

    console.log(respData);

    addWeathertoPage(respData);
}

function addWeathertoPage(data)
{
    const temperature = KtoF(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" /> ${temperature}°C <img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
        <div class="more-info">
        <p>Humidity : <span>${humidity}%</span></p>
        <p>Wind speed : <span>${+Math.trunc(windSpeed * 3.16)}km/h</span></p>
        </div>
    `;

    main.appendChild(weather);
}

function KtoF(K)
{
    return Math.floor((K-273.5)*(9/5))
}

form.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const city = search.value;

    if (city)
    {
        getWeatherByLocation(city);
    }
})
