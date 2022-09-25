const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('creation of a user', () => {
    test('succeeds with code 201 if a valid user is added', async () => {
        const body = {
            username: 'arnie',
            name: 'Arnold Schwarzenegger',
            password: 'Get to da choppa'
        }

        await api
            .post('/api/users')
            .send(body)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContainEqual('arnie')
    })

    test('fails with code 400 if the username is too short', async () => {
        const body = {
            username: 'ar',
            name: 'Arnold Schwarzenegger',
            password: 'Get to da choppa'
        }

        const res = await api
            .post('/api/users')
            .send(body)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(0)
        expect(res.body).toEqual({error: 'User validation failed: username: Path `username` (`ar`) is shorter than the minimum allowed length (3).'})
    })

    test('fails with code 400 if the password is too short', async () => {
        const body = {
            username: 'arnie',
            name: 'Arnold Schwarzenegger',
            password: 'sh'
        }

        const res = await api
            .post('/api/users')
            .send(body)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(0)
        expect(res.body).toEqual({error: 'password must be at least 3 characters long'})
    })

    test('fails with code 400 if a username already exists', async () => {
        const body = {
            username: 'arnie',
            name: 'Arnold Schwarzenegger',
            password: 'Get to da choppa'
        }

        await api
            .post('/api/users')
            .send(body)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/users')
            .send(body)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContainEqual('arnie')
    })
})

afterAll(() => {
    mongoose.connection.close()
})