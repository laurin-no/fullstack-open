import {useState} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
    const initialPersons = [
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]

    const [persons, setPersons] = useState(initialPersons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personsShown, setPersonsShown] = useState(initialPersons)

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