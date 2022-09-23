const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned in JSON', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier of blog posts is named id', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    res.body.forEach(b => {
        expect(b).toHaveProperty('id')
    })
})

test('a valid blog can be added', async () => {
    const body = {
        title: 'Awesome linux blog',
        author: 'Linus Torvalds',
        url: 'https://blog.linux.org',
        likes: 42
    }

    await api
        .post('/api/blogs')
        .send(body)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd.map(({title, author, url, likes}) => {
        return {title, author, url, likes}
    })).toContainEqual(body)

})

test('when creating a blog entry without the likes property set, a default value is set', async () => {
    const body = {
        title: 'Awesome linux blog',
        author: 'Linus Torvalds',
        url: 'https://blog.linux.org'
    }

    const res = await api
        .post('/api/blogs')
        .send(body)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    console.log(blogsAtEnd.find(b => b.id === res.body.id))
    expect(blogsAtEnd.find(b => b.id === res.body.id)).toHaveProperty('likes', 0)


})

test('an invalid blog is not added and properly rejected', async () => {
    const body = {
        author: 'Linus Torvalds',
        likes: 42
    }

    await api
        .post('/api/blogs')
        .send(body)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})