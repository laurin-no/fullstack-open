import React from 'react'
import Course from './Course'

const Courses = ({courses}) => {

    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map(course =>
                <Course key={course.id} course={course}/>)}
        </>
    )
}

export default Courses