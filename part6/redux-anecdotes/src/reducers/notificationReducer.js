import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        unsetNotification(state, action) {
            return null
        }
    }
})

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer