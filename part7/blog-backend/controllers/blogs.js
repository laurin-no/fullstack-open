const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
const { request, response } = require('express')

router.get('/', async (request, response) => {
    const notes = await Blog.find({})
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(notes)
})

router.post('/', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user
    const blog = new Blog({ ...request.body, user: user.id })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await savedBlog.populate('user', {
        username: 1,
        name: 1,
    })
    response.status(201).json(populatedBlog)
})

router.delete('/:id', async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)
    if (!blogToDelete) {
        return response.status(204).end()
    }

    if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
        return response.status(401).json({
            error: 'only the creator can delete a blog',
        })
    }

    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
})

router.put('/:id', async (request, response) => {
    const blog = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: 'query',
    }).populate('user', { username: 1, name: 1 })

    response.json(updatedBlog)
})

router.post('/:id/comments', async (request, response) => {
    const comment = request.body.comment

    const updated = await Blog.findByIdAndUpdate(
        request.params.id,
        {
            $push: { comments: comment },
        },
        { new: true }
    ).populate('user', { username: 1, name: 1 })

    response.json(updated)
})

module.exports = router
