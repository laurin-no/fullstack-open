import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR } from '../queries'

const AuthorEditForm = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [changeAuthor] = useMutation(UPDATE_AUTHOR)

    const submit = (event) => {
        event.preventDefault()

        changeAuthor({ variables: { name, born: parseInt(born) } })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>

            <form onSubmit={submit}>
                <div>
                    name{' '}
                    <select
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                        {authors.map((a) => (
                            <option key={a.id} value={a.name}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    born{' '}
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default AuthorEditForm
