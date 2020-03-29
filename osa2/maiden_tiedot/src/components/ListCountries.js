import React from 'react';
import Country from './Country';

const ListCountries = ({ countryList, handleClick }) => {
    if (countryList.length > 10) {
        return (
            <div>
                Too many matches. Please, add letters to the filter.
            </div>
        )
    } else if (countryList.length === 1) {
        return (
            <div>
                {countryList.map(country => (
                    <Country key={country.name} country={country} />
                ))}
            </div>
        )
    } else {
        return (
            <div>
                {countryList.map(country => (
                    <div key={country.name}>
                        {country.name}&nbsp;
                        <button
                            id={country.alpha3Code}
                            onClick={handleClick}>
                                Show
                        </button>
                    </div>
                ))}
            </div>
        )
    }
}

export default ListCountries;