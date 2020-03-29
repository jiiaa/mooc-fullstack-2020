import React from 'react';

const Country = ({ country }) => (
    <div>
        <h2>{country.name}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h4>Languages</h4>
        <ul>
            {country.languages.map(language => (
                <li key={language.name}>{language.name}</li>
            ))}
        </ul>
        <div>
            <img src={country.flag} alt="Country flag" />
        </div>
    </div>
)

export default Country;