const apiKey = "967461051e73d2b243268c7e3cafa427"

async function weatherSearch(){
    const city = document.getElementById("cityInput").value;
    const weatherResult = document.getElementById("weatherResult");

    if (city === '') {
        weatherResult.innerHTML = `,<p>Please enter city name.</p>`;
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 404) {
            weatherResult.innerHTML = `<p>City not found</p>`
            return;
        }

        function convertToIST(unixTimestamp){
            const date = new Date(unixTimestamp * 1000)
            return date.toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit"                              
            })
        }

        const sunrise = convertToIST(data.sys.sunrise)
        const sunset = convertToIST(data.sys.sunset);

        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
            <p><b>Temprature: </b>${data.main.temp}°C</p>
            <p><b>Condition: </b>${data.weather[0].description}</p>
            <p><b>Humitidity: </b>${data.main.humidity}%</p>
            <p><b>Wind Speed: </b>${data.wind.speed} m/s</p>
            <p><b>Sunrise: </b>${sunrise}</p>
            <p><b>Sunset: </b>${sunset}</p>
        `;
        
    } catch (error) {
        weatherResult.innerHTML = `<p>Something went wrong. Please try again!</p>`
        console.log(error)
    }
}