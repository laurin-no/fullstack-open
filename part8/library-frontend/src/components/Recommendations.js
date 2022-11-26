import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ genre, show }) => {
    const result = useQuery(ALL_BOOKS, { variables: { genre } })

    if (!show) {
        return null
    }

    if (!result.data) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>
            <div>
                books in your favourite genre <strong>{genre}</strong>
            </div>
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
        </div>
    )
}

export default Recommendations
