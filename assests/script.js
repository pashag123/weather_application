var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

var weatherApiKey = 'd7dd1e7a95b0b6d327f94a6fb93e8ed2';

var searchBtn = document.querySelector('#searchbtn');

var searchBar = document.querySelector('#search-bar');


function currentWeather(city) {

    var catUrl = weatherApiUrl + city + `&appid=${weatherApiKey}&units=imperial`;

    fetch(catUrl)
        .then(function (response) {
            return response.json()


        })
        .then(function (data) {

            console.log(data)


            var lat = data.coord.lat
            var lon = data.coord.lon
            var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`

            renderCurrentWeather(data)


            fetch(fiveDay)
                .then(function (response) {

                    return response.json()
                })
                .then(function (data) {
                    renderForecast(data)
                  
                  
                    console.log(data)
                })



        }).catch



};

function renderForecast(data) {

var fiveDayEl = document.querySelector('.forecast-card-container')

for (var i = 0; i < data.list.length; i+=8) {

var date = document.createElement('h3');
date.textContent = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')

var icon = document.createElement('img')

icon.setAttribute('src', `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`)

var temp = document.createElement('p')
temp.textContent = data.list[i].main.temp

var windSpeed = document.createElement('p')
windSpeed.textContent = data.list[i].wind.speed

var humidity = document.createElement('p')
humidity.textContent = data.list[i].main.humidity


var forecastCard = document.createElement('div')
forecastCard.append(date, icon, temp, windSpeed, humidity)
fiveDayEl.append(forecastCard)
}

}











function renderCurrentWeather(city) {

    document.querySelector('#searched-city').textContent = city.name

    var today = dayjs.unix(city.dt).format('MM/DD/YYYY')

    document.querySelector('#date').textContent = today

    document.querySelector('#current-weather-icon').setAttribute('src', `https://openweathermap.org/img/w/${city.weather[0].icon}.png`)

    document.querySelector('#temp').textContent = city.main.temp + ' F°'

    document.querySelector('#wind').textContent = city.wind.speed + ' mph'

    document.querySelector('#humidity').textContent = city.main.humidity + ' %'

};























searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBar.value;
    currentWeather(city);

})
