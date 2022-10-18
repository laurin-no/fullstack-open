import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, [dispatch])


    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            <Notification/>
            <AnecdoteForm/>
            <AnecdoteList/>
        </div>
    )
}

export default App