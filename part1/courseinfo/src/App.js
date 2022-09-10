const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Part = (props) => {
    return (<p>
        {props.part.name} {props.part.exercises}
    </p>)
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.course.parts[0]} exercises={props.course.parts[0]}/>
            <Part part={props.course.parts[1]} exercises={props.course.parts[1]}/>
            <Part part={props.course.parts[2]} exercises={props.course.parts[2]}/>
        </div>
    )
}

const Total = (props) => {
    const total = props.course.parts
        .map(p => p.exercises)
        .reduce((a, b) => a + b, 0)

    return (
        <p>Number of exercises {total}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default App
