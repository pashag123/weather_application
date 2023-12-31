var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

var weatherApiKey = 'd7dd1e7a95b0b6d327f94a6fb93e8ed2';

var searchBtn = document.querySelector('#searchbtn');

var searchBar = document.querySelector('#search-bar');

renderSearchHistory();

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

    fiveDayEl.innerHTML = ''

    for (var i = 0; i < data.list.length; i += 8) {

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
        forecastCard.style.width = '15%'
        forecastCard.classList.add('forecast-cards')
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


function saveSearchHistory() {

    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []

    if (searchHistory.includes(searchBar.value)) {

        return



    }
    searchHistory.push(searchBar.value)
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))




}

function renderSearchHistory() {
document.getElementById('search-history').innerHTML = ''
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []

    if (!searchHistory.length) {
        return
    }
    for (i = searchHistory.length - 1; i >= 0; i--) {
        let pastSearch = document.createElement('button')
        pastSearch.textContent = searchHistory[i]
        document.getElementById('search-history').append(pastSearch)
    }


}


function  historyButton(e) {
    if (e.target.tagName !== 'BUTTON') {
        return
    }
currentWeather(e.target.textContent);
}
















searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    city = searchBar.value;
    if (!city) {return}
    currentWeather(city);
    saveSearchHistory();
    renderSearchHistory();
})

document.getElementById('search-history').addEventListener('click', historyButton)