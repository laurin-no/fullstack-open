import React from 'react'
import Person from './Person'

const Persons = ({persons, deletePerson}) => {
    return (
        <>
            {persons.map(person => <Person key={person.id} person={person} deletePerson={() => deletePerson(person)}/>)}
        </>
    )
}

export default Persons