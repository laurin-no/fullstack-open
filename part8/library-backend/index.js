const config = require('./utils/config')
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

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

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.estimatedDocumentCount(),
        authorCount: async (root, args) => Author.estimatedDocumentCount(),
        allBooks: async (root, args) => allBooks(args.author, args.genre),
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: async (root) => {
            return Book.countDocuments({ author: root })
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            const maybeAuthor = await Author.findOne({ name: args.author })

            const createAuthor = async (name) => {
                const authorToSave = new Author({ name })
                return await authorToSave.save()
            }

            const author = maybeAuthor ?? (await createAuthor(args.author))

            const book = new Book({ ...args, author })
            return book.save()
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.setBornTo
            return author.save()
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
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
