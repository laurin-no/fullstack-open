import React from 'react'
import CountryDetails from './CountryDetails'
import CountriesList from './CountriesList'

const Countries = ({countries, handleDetailsClick}) => {
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]}/>
        )
    }

    return (
        <CountriesList countries={countries} handleClick={handleDetailsClick}/>
    )
}

export default Countries