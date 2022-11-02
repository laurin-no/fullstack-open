import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        error: errorReducer,
        blogs: blogReducer,
    },
})

export default store
