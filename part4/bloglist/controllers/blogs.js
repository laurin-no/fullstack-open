const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {

    const user = await User.findById(request.user)

    const {title, author, url, likes} = request.body

    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).end()
    } else if (blog.user.toString() !== request.user) {
        return response.status(401).end()
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {likes: body.likes}

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: 'query'
    })

    if (result) {
        response.json(result)
    } else {
        response.status(404).send({error: `blog with id ${request.params.id} not found.`})
    }
})

module.exports = blogsRouter