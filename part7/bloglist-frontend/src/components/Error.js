import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
    const message = useSelector((state) => state.error)
    const notificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle} className="error">
            {message}
        </div>
    )
}

export default Error
