import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateBlog(state, action) {
            const changedBlog = action.payload
            return state.map((a) => (a.id !== changedBlog.id ? a : changedBlog))
        },
        appendBlog(state, action) {
            return state.concat(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch(appendBlog(newBlog))
    }
}

export default blogSlice.reducer
