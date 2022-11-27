import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import { ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [requestCurrentUser, currentUserResult] = useLazyQuery(CURRENT_USER)
    const client = useApolloClient()

    useEffect(() => {
        const getCurrentUser = async () => {
            if (token) {
                const userRes = await requestCurrentUser()
                setUser(userRes.data.me)
            }
        }
        getCurrentUser()
    }, [token])

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const bookAdded = data.data.bookAdded

            client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(bookAdded),
                }
            })

            bookAdded.genres.forEach((genre) => {
                client.cache.updateQuery(
                    { query: ALL_BOOKS, variables: { genre } },
                    ({ allBooks }) => {
                        return {
                            allBooks: allBooks.concat(bookAdded),
                        }
                    }
                )
            })
        },
    })

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {!!token && (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommendations')}>
                            recommendations
                        </button>
                        <button onClick={() => logout()}>logout</button>
                    </>
                )}
                {!token && (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <LoginForm
                show={page === 'login'}
                setToken={setToken}
                setPage={setPage}
            />

            <Recommendations
                show={page === 'recommendations'}
                genre={user?.favouriteGenre}
            />
        </div>
    )
}

export default App
