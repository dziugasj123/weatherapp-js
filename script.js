const cityInput = document.querySelector('input');
let cityValue = 'Vilnius';
let enterPressed = false;

initializeInputEvents();
fetchCity(cityValue);

async function fetchCity(cityValue){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${cityValue}`);
    const fetchData = await response.json();

    const imgsrc = fetchData.current.condition.icon;
    const condition = fetchData.current.condition.text;
    let country = fetchData.location.country;
    if (country === 'United States of America'){
        country = 'USA';
    }
    const loc = fetchData.location.name;
    const temp = Math.round(fetchData.current.temp_c);
    const humidity = fetchData.current.humidity;
    const wind = fetchData.current.wind_kph;

    createDOM(imgsrc,condition,country,loc, temp,humidity, wind);
}

function createDOM(imgsrc,condition,country,loc,temp,humidity,wind){
    const imgDOM = document.querySelector('.img-class');
    const conditionP = document.querySelector('.condition-p');
    const locP = document.querySelector('.city-p');
    const tempP = document.querySelector('.temperature-p');
    const humidityP = document.querySelector('.humidity-p');
    const windP = document.querySelector('.wind-p');

    imgDOM.src = imgsrc;

    conditionP.textContent = condition;
    locP.textContent = loc + ', ' + country;
    tempP.textContent = `${temp}°C`;
    humidityP.textContent = `${humidity}%`;
    windP.textContent = `${wind} km/h`;
}

function initializeInputEvents(){
    cityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            enterPressed = true;
            cityValue = cityInput.value;
            fetchCity(cityValue);
        }
    });

    cityInput.addEventListener('blur', debounce(() => {
        if (!enterPressed) {
            cityValue = cityInput.value;
            fetchCity(cityValue);
        }
        enterPressed = false;
    }, 300));
}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}