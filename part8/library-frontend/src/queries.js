import { gql } from '@apollo/client'

export const ALL_AUTHORS_AND_BOOKS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
        allBooks {
            title
            author
            published
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author
            published
            genres
            id
        }
    }
`
