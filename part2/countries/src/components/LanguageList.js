import React from 'react'

const LanguageList = ({languages}) => {
    return (
        <div>
            <h3>languages:</h3>
            <ul>
                {Object.entries(languages).map(([id, name]) => <li key={id}>{name}</li>)}
            </ul>
        </div>
    )
}

export default LanguageList