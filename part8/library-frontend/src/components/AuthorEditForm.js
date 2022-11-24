import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR } from '../queries'

const AuthorEditForm = () => {
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
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
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
