let accessKey = "RV869X8BEG5LEDMEPJMZC7LM8";

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
    const [city, state] = cityState();
    fetchWeatherData(city,state);
});

const fetchWeatherData = async (city,state) => {
    const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}${state}/?key=RV869X8BEG5LEDMEPJMZC7LM8`);
    const resBody = await res.json();
    console.log(resBody);
    displayWeatherData(resBody);
    displayWeatherDayHour(resBody);
}

const cityState = () => {
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const arr =  [city.value, state.value];
    state.value = "";
    city.value = "";
    return arr
}

const displayWeatherData = (resBody) => {
    const weatherDiv = document.getElementById("displayWeather");
    const h2 = document.createElement("h2");
    h2.innerText = "Weather"
    weatherDiv.appendChild(h2);
    const h3 = document.createElement("h3");
    h3.innerText = "Click day to see hourly weather";
    weatherDiv.appendChild(h3)
    let counter = 0;
    resBody.days.forEach(ele => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        div.setAttribute("id", `${counter}`);
        p.setAttribute("data-day",`${counter}`);
        p.innerText = `${ele.datetime} - feels like max: ${ele.feelslikemax} degress - feels like min: ${ele.feelslikemin} degrees`;
        div.appendChild(p);
        weatherDiv.appendChild(div);
        counter++;
    });
}

const weatherDayHour = (resBody,day) =>  {
    const hours = resBody.days[day].hours;
    const dayDiv = document.getElementById(`${day}`);
    hours.forEach(ele => {
        const p = document.createElement("p");
        p.setAttribute("class", `${day}hours`)
        p.innerText = `time: ${ele.datetime}, conditions: ${ele.conditions}, temp: ${ele.temp}, feelslike: ${ele.feelslike}, windgust: ${ele.windgust} mph`
        dayDiv.appendChild(p)
    });
}

const displayWeatherDayHour = (resBody) => {
    const weatherDiv = document.getElementById("displayWeather");
    weatherDiv.addEventListener("click", (event) => {
        event.stopImmediatePropagation();
        let day = event.target.dataset.day;
        if (!document.getElementsByClassName(`${day}hours`).length)  {
            weatherDayHour(resBody,day);
        }
        else {
            removeWeatherDayHour(day);
        }
    })
}

const removeWeatherDayHour = (day) => {
    const dayHours = document.getElementsByClassName(`${day}hours`);
    console.log(dayHours)
    for (let i = dayHours.length -1; i >= 0; i--) {
        dayHours[i].remove()
    }
}
