import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Error = () => {
    const message = useSelector((state) => state.error)

    if (message === null) {
        return null
    }

    return <Alert variant="danger">{message}</Alert>
}

export default Error
