import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = ({ show }) => {
    const result = useQuery(ALL_BOOKS)
    const [books, setBooks] = useState([])
    const [executeSearch, searchResult] = useLazyQuery(ALL_BOOKS)
    const [genres, setGenres] = useState([])

    useEffect(() => {
        if (searchResult?.data) {
            setBooks(searchResult.data.allBooks)
        } else if (result.data) {
            setBooks(result.data.allBooks)
            setGenres([
                ...new Set(result.data.allBooks.map((b) => b.genres).flat()),
            ])
        }
    }, [result.data, searchResult.data])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {genres.map((g) => (
                <button
                    key={g}
                    onClick={() => executeSearch({ variables: { genre: g } })}
                >
                    {g}
                </button>
            ))}
        </div>
    )
}

export default Books
