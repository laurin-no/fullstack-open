const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '63302021763bec90c4b370e4',
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '63302021763bec90c4b370e4',
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: '63302021763bec90c4b370e4',
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        user: '63302021763bec90c4b370e4',
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: '63302021763bec90c4b370e4',
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        user: '63302021763bec90c4b370e4',
        __v: 0
    }
]

const initialUsers = [
    {
        _id: '63302021763bec90c4b370e4',
        username: 'arnie',
        name: 'Arnold Schwarzenegger',
        passwordHash: '$2b$10$h.RmIH6uYpRjD51HljJw2OFGh5PpDRAaYT7TlxdUyxN5B4TC0K4gy',
        blogs: ['5a422a851b54a676234d17f7',
            '5a422aa71b54a676234d17f8',
            '5a422b3a1b54a676234d17f9',
            '5a422b891b54a676234d17fa',
            '5a422ba71b54a676234d17fb',
            '5a422bc61b54a676234d17fc'],
        __v: 0
    },
    {
        '_id': '6330234fe5122645e92834cf',
        'username': 'stallone',
        'name': 'Sylvester Stallone',
        'passwordHash': '$2b$10$.kgOwjAUs/lI7VuZz5OwMeHRw6clqx2jHMkFA5CpBuzHIMAwrq9Bq',
        'blogs': [],
        '__v': 0
    }
]

const tokenStallone = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyIiwiaWQiOiI2MzMwMjM0ZmU1MTIyNjQ1ZTkyODM0Y2YiLCJpYXQiOjE2NjQxMzQ0MTR9.Tjkr9GpSCVp5QOQNblfdMlT7qPvMU63_uUNiS6GrR8o'
const tokenArnie = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFybmllIiwiaWQiOiI2MzMwMjAyMTc2M2JlYzkwYzRiMzcwZTQiLCJpYXQiOjE2NjQxMDczOTl9.4arvqthqGZLauEfY7r_oyfZG1xZdUY6vEp2U_2b9PmY'

const nonExistingId = async () => {
    const blog = new Blog({title: 'to delete', url: 'example.com'})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUsers, tokenArnie, tokenStallone
}