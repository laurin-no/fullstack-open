import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setText(state, action) {
            return action.payload
        },
        clearText() {
            return null
        }
    }
})

export const { setText, clearText } = notificationSlice.actions

export const setNotification = (notification, duration) => {
    return async dispatch => {
        dispatch(setText(notification))
        setTimeout(() => {
            dispatch(clearText())
        }, duration * 1000)
    }
}

export default notificationSlice.reducer