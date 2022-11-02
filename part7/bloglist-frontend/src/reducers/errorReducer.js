import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
    name: 'error',
    initialState: null,
    reducers: {
        setText(state, action) {
            return action.payload
        },
        clearText() {
            return null
        },
    },
})

export const { setText, clearText } = errorSlice.actions

let timeoutId

export const setError = (error, duration) => {
    return (dispatch) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        dispatch(setText(error))
        timeoutId = setTimeout(() => {
            dispatch(clearText())
        }, duration * 1000)
    }
}

export default errorSlice.reducer
