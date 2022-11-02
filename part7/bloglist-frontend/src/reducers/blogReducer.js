import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setError } from './errorReducer'

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
        removeBlog(state, action) {
            const blogToDelete = action.payload
            return state.filter((b) => b.id !== blogToDelete.id)
        },
    },
})

export const { updateBlog, appendBlog, setBlogs, removeBlog } =
    blogSlice.actions

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

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try {
            const liked = { ...blog, likes: blog.likes ? blog.likes + 1 : 1 }
            const updated = await blogService.update(liked)
            dispatch(updateBlog(updated))
        } catch (e) {
            dispatch(setError('Blog update failed', 5))
        }
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.deleteById(blog.id)
        dispatch(removeBlog(blog))
    }
}

export default blogSlice.reducer
