import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateAnecdote(state, action) {
            const changedAnecdote = action.payload
            return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
        },
        appendAnecdote(state, action) {
            return state.concat(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = object => {
    return async dispatch => {
        const voted = { ...object, votes: object.votes + 1 }
        const updatedAnecdote = await anecdoteService.update(voted)
        dispatch(updateAnecdote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer