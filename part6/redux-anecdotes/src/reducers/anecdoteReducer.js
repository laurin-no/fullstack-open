import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(a => a.id === id)
            const changedAnecdote = {
                ...anecdoteToChange, votes: anecdoteToChange.votes + 1
            }
            return state.map(a => a.id !== id ? a : changedAnecdote)
        },
        createAnecdote(state, action) {
            return state.concat(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
    }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer