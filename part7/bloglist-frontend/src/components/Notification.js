import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector((state) => state.notification)
    const notificationStyle = {
        color: 'green',
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

    return <div style={notificationStyle}>{message}</div>
}

export default Notification
