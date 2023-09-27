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

};























searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBar.value;
    currentWeather(city);

})
