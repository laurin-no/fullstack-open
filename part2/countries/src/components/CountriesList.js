import React from 'react'

const CountriesList = ({countries, handleClick}) => {
    return (
        <>
            {countries.map(country => <div key={country.name.common}>{country.name.common}
                <button onClick={() => handleClick(country)}>show</button>
            </div>)}
        </>
    )
}

export default CountriesList