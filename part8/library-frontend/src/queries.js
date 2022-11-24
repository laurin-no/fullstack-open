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
