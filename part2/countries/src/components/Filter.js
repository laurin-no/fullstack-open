import React from 'react'

const Filter = ({handleFilterChange}) => {
    return (
        <div>
            find countries <input onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter