const Book = require('./models/book')
const Author = require('./models/author')
const { AuthenticationError, UserInputError } = require('apollo-server')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const JWT_SECRET = config.SECRET

const resolvers = {
    Query: {
        bookCount: async () => Book.estimatedDocumentCount(),
        authorCount: async (root, args) => Author.estimatedDocumentCount(),
        allBooks: async (root, args) => allBooks(args.author, args.genre),
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => context.currentUser,
    },
    Author: {
        bookCount: async (root) => {
            return Book.countDocuments({ author: root })
        },
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            try {
                const maybeAuthor = await Author.findOne({ name: args.author })
                const authorToSave = new Author({ name: args.author })
                const author = maybeAuthor ?? (await authorToSave.save())

                const book = new Book({ ...args, author })
                await book.save()

                pubsub.publish('BOOK_ADDED', { bookAdded: book })

                return book
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.setBornTo
            try {
                return author.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args,
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre,
            })

            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
}

const allBooks = async (author, genre) => {
    const authorObj = await Author.findOne({ name: author })

    if (!author && !genre) {
        return Book.find({}).populate('author')
    } else if (author && !authorObj) {
        return []
    } else if (author && !genre) {
        return Book.find({ author: authorObj }).populate('author')
    } else if (!author && genre) {
        return Book.find({ genres: { $in: genre } }).populate('author')
    } else {
        return Book.find({
            author: authorObj,
            genres: { $in: genre },
        }).populate('author')
    }
}

module.exports = resolvers
