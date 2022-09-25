const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('requesting all blogs', () => {
    test('returns the results in JSON', async () => {
        const res = await api
            .get('/api/blogs')
            .set('Authorization', helper.tokenArnie)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })

    test('utilizes a field named id as the unique identifier of blog posts', async () => {
        const res = await api
            .get('/api/blogs')
            .set('Authorization', helper.tokenArnie)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        res.body.forEach(b => {
            expect(b).toHaveProperty('id')
        })
    })
})

describe('creation of a blog', () => {
    test('succeeds with code 201 if a valid is added', async () => {
        const body = {
            title: 'Awesome linux blog',
            author: 'Linus Torvalds',
            url: 'https://blog.linux.org',
            likes: 42
        }

        await api
            .post('/api/blogs')
            .send(body)
            .set('Authorization', helper.tokenArnie)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(blogsAtEnd.map(({title, author, url, likes}) => {
            return {title, author, url, likes}
        })).toContainEqual(body)
    })

    test('returns 401 unauthorized if no token is provided', async () => {
        const body = {
            title: 'Awesome linux blog',
            author: 'Linus Torvalds',
            url: 'https://blog.linux.org',
            likes: 42
        }

        await api
            .post('/api/blogs')
            .send(body)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('sets a default value, when creating a blog entry without the likes property set', async () => {
        const body = {
            title: 'Awesome linux blog',
            author: 'Linus Torvalds',
            url: 'https://blog.linux.org'
        }

        const res = await api
            .post('/api/blogs')
            .send(body)
            .set('Authorization', helper.tokenArnie)
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
            .set('Authorization', helper.tokenArnie)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const blogToDelete = blogsAtBeginning[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', helper.tokenArnie)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        expect(blogsAtEnd.map(b => b.title)).not.toContainEqual(blogToDelete.title)
    })

    test('returns 404 if an id is not found', async () => {
        const blogToDeleteId = await helper.nonExistingId()

        await api
            .delete(`/api/blogs/${blogToDeleteId}`)
            .set('Authorization', helper.tokenArnie)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('returns status code 400 if the id is malformed and does not change data', async () => {
        await api
            .delete('/api/blogs/1234')
            .set('Authorization', helper.tokenArnie)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('updating of a blog', () => {

    test('successfully updates the likes for a blog', async () => {
        const blogsAtBeginning = await helper.blogsInDb()
        const blogToUpdate = blogsAtBeginning[0]
        const body = {likes: blogToUpdate.likes + 42}

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(body)
            .set('Authorization', helper.tokenArnie)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd
            .map(({id, likes}) => {
                return {id, likes}
            })
            .find(b => b.id === blogToUpdate.id))
            .toEqual({id: blogToUpdate.id, likes: body.likes})
    })

    test('returns 404 if blog id is not found', async () => {
        const blogToUpdateId = await helper.nonExistingId()
        const body = {likes: 1337}

        await api
            .put(`/api/blogs/${blogToUpdateId}`)
            .send(body)
            .set('Authorization', helper.tokenArnie)
            .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
})