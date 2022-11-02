import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        error: errorReducer,
    },
})

export default store
