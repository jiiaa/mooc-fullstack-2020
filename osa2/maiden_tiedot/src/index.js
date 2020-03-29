import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { WEATHER_API_KEY } from './constants';

import ListCountries from './components/ListCountries';
import PrintWeather from './components/PrintWeather'
import './index.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [cityWeather, setCityWeather] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const handlChange = e => {
    const filter = e.target.value;
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (filteredCountries.length === 1) {
      const forWeather = [filteredCountries[0].capital, filteredCountries[0].alpha3Code];
      getWeather(forWeather);
    } else {
      getWeather(false);
    }
    setCountryList(filteredCountries);
  }

  const handleClick = e => {
    const id = e.target.id;
    const filteredCountry = countries.filter(country => country.alpha3Code === id)
    const forWeather = [filteredCountry[0].capital, filteredCountry[0].alpha3Code];
    getWeather(forWeather);
    setCountryList(filteredCountry);
  }

  const getWeather = (forWeather) => {
    if (forWeather) {
      const units = 'units=metric';
      const lang = 'lang=en';
      const city = `${forWeather[0]},${forWeather[1]}`;
      const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
      const url = `${baseUrl}?q=${city}&APPID=${WEATHER_API_KEY}&${lang}&${units}`;
      axios
        .get(url)
        .then(response => {
          setCityWeather(response.data);
        })
    } else {
      setCityWeather([]);
    }
  }

  return (
    <div>
      <div>
        <h2>Country Data</h2>
        <label htmlFor="country">Find countries: </label>
        <input id="country" onChange={handlChange} />
      </div>
      <div>
        <ListCountries countryList={countryList} handleClick={handleClick} />
        {cityWeather.list && <PrintWeather weather={cityWeather} />}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));