import { gql } from '@apollo/client'

export const ALL_AUTHORS_AND_BOOKS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
        allBooks {
            title
            author {
                name
            }
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
            author {
                name
            }
            published
            genres
            id
        }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
            bookCount
            id
        }
    }
`
