const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts = [
        {
            name: 'Fundamentals',
            exerciseCount: 10
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14
        }
    ];

    interface HeaderProps {
        name: string;
    }

    const Header = (props: HeaderProps) => {
        return <h1>{props.name}</h1>;
    };

    interface Course {
        name: string,
        exerciseCount: number
    }

    interface ContentProps {
        courses: Course[];
    }

    const Content = (props: ContentProps) => {
        return (
            <>
                {props.courses.map(course =>
                    <p key={course.name}>{course.name} {course.exerciseCount}</p>
                )}
            </>
        );
    };

    interface TotalProps {
        courses: Course[];
    }

    const Total = (props: TotalProps) => {
        return <p>
            Number of exercises {' '}
            {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>;
    };

    return (
        <div>
            <Header name={courseName} />
            <Content courses={courseParts} />
            <Total courses={courseParts} />
        </div>
    );
};

export default App;