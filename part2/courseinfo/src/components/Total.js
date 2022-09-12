import React from 'react'

const Total = ({parts}) => {

    const sum = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

export default Total