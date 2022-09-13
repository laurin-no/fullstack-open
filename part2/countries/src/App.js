import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    })

    const handleFilterChange = (event) => {
        const filtered = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))

        setFilteredCountries(filtered)
    }

    const handleDetailsClick = (country) => {
        setFilteredCountries([country])
    }

    return (
        <div>
            <Filter handleFilterChange={handleFilterChange}/>
            <Countries countries={filteredCountries} handleDetailsClick={handleDetailsClick}/>
        </div>
    )
}


export default App
