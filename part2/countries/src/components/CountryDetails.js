import React from 'react'
import LanguageList from './LanguageList'
import Weather from './Weather'

const CountryDetails = ({country}) => {
    return (
        <div>
            <h1>{country.name.common} {country.flag}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area} km²</div>
            <LanguageList languages={country.languages}/>

            <Weather country={country}/>
        </div>
    )
}

export default CountryDetails