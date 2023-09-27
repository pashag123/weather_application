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

            renderCurrentWeather(data)

        })



};


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
