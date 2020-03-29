import React from 'react';

const PrintWeather = ({ weather }) => {
    const image = `http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
    const temperature = Math.round(weather.list[0].main.temp);
    const feelsLike = Math.round(weather.list[0].main.feels_like);

    return (
        <div>
            <h3>Weather in {weather.city.name}</h3>
            <div>
                Weather: {weather.list[0].weather[0].description}&nbsp;
                <img src={image} alt="Weather icon" />
            </div>
            <div>Temperature: {temperature} celsius, feels like {feelsLike} celsius</div>
            <div>Wind: {weather.list[0].wind.speed} m/s</div>
        </div>
    )
}

export default PrintWeather;