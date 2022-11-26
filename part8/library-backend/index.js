const config = require('./utils/config')
const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = config.SECRET

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favouriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

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

            const maybeAuthor = await Author.findOne({ name: args.author })

            const createAuthor = async (name) => {
                const authorToSave = new Author({ name })
                try {
                    return await authorToSave.save()
                } catch (e) {
                    throw new UserInputError(e.message, {
                        invalidArgs: args,
                    })
                }
            }

            const author = maybeAuthor ?? (await createAuthor(args.author))

            const book = new Book({ ...args, author })
            try {
                return book.save()
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
