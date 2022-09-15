import {useEffect, useState} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personsShown, setPersonsShown] = useState([])
    const [personsFilter, setPersonsFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response)
                setPersonsShown(response)
            })
    }, [])


    const handlePersonResponse = (returnedPerson, responseHandler) => {
        setPersons(prevState => responseHandler(prevState))
        if (comparePerson(returnedPerson, personsFilter)) {
            setPersonsShown(prevState => responseHandler(prevState))
        }
        setNewName('')
        setNewNumber('')
    }

    const handlePersonUpdateResponse = (returnedPerson) => {
        const handler = (persons) => persons.map(p =>
            p.id === returnedPerson.id ?
                returnedPerson :
                p
        )

        handlePersonResponse(returnedPerson, handler)
    }

    const handlePersonCreationResponse = (returnedPerson) => {
        const handler = (persons) => [...persons, returnedPerson]

        handlePersonResponse(returnedPerson, handler)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(person => person.name === newName)


        if (existingPerson !== undefined) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const reqBody = {...existingPerson, number: newNumber}

                personService
                    .update(existingPerson.id, reqBody)
                    .then(returnedPerson => handlePersonUpdateResponse(returnedPerson))
                    .then(() => {
                        setNotificationMessage(
                            `Updated ${existingPerson.name}`
                        )
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 4000)
                    })
                    .catch(error => {
                        const cleanPersons = persons.filter(p => p.id !== existingPerson.id)
                        setPersons(cleanPersons)
                        setPersonsShown(filterPersons(cleanPersons, personsFilter))

                        setErrorMessage(
                            `Information of ${existingPerson.name} has already been removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 7000)
                    })
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => handlePersonCreationResponse(returnedPerson))
                .then(() => {
                    setNotificationMessage(
                        `Added ${personObject.name}`
                    )
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 4000)
                })
        }
    }

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}`)) {
            personService.deleteEntity(person.id)
                .then(() => {
                    const cleanPersons = persons.filter(p => p.id !== person.id)
                    setPersons(cleanPersons)
                    setPersonsShown(filterPersons(cleanPersons, personsFilter))
                })
        }
    }

    const comparePerson = (person, filter) => person.name.toLowerCase().includes(filter.toLowerCase())

    const filterPersons = (pers, filter) => pers.filter(person => comparePerson(person, filter))

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        const filter = event.target.value
        setPersonsShown(filterPersons(persons, filter))
        setPersonsFilter(filter)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage}/>
            <Error message={errorMessage}/>
            <Filter handleFilterChange={handleFilterChange}/>

            <h3>add a new</h3>
            <PersonForm newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange}
                        handleNameChange={handleNameChange} addPerson={addPerson}/>

            <h3>Numbers</h3>
            <Persons persons={personsShown} deletePerson={(person) => deletePerson(person)}/>
        </div>
    )
}

export default App