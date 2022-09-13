import {useEffect, useState} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personsShown, setPersonsShown] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
                setPersonsShown(response.data)
            })
    }, [])


    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        if (persons.some(person => person.name === personObject.name)) {
            window.alert(`${newName} is already added to the phonebook`)
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const filterPersons = (input) => persons.filter(person => person.name.toLowerCase().includes(input.toLowerCase()))

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setPersonsShown(filterPersons(event.target.value))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange}/>

            <h3>add a new</h3>
            <PersonForm newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange}
                        handleNameChange={handleNameChange} addPerson={addPerson}/>

            <h3>Numbers</h3>
            <Persons persons={personsShown}/>
        </div>
    )
}

export default App