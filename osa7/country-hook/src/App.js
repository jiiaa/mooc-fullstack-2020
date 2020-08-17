import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `http://restcountries.eu/rest/v2/name/${name}?fullText=true`;

  const fetchCountry = async () => {
    try {
      const res = await axios.get(url);
      setCountry(res);
    } catch (error) {
      setCountry(error);
    }
  }

  useEffect(() => {
    fetchCountry();
  }, [name]);

  return {
    country,
  }
}

const Country = ({ country }) => {
  if (country.country === null) {
    return null
  }

  if (country.country.isAxiosError) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.country.data[0].name} </h3>
      <div>capital {country.country.data[0].capital} </div>
      <div>population {country.country.data[0].population}</div> 
      <img src={country.country.data[0].flag} height='100' alt={`flag of ${country.country.data[0].name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App