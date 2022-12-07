const App = () => {
    const courseName = 'Half Stack application development';

    interface CoursePartBase {
        name: string;
        exerciseCount: number;
        type: string;
    }

    interface CoursePartDescriptionBase extends CoursePartBase {
        description: string;
    }

    interface CourseNormalPart extends CoursePartDescriptionBase {
        type: 'normal';
    }

    interface CourseProjectPart extends CoursePartBase {
        type: 'groupProject';
        groupProjectCount: number;
    }

    interface CourseSubmissionPart extends CoursePartDescriptionBase {
        type: 'submission';
        description: string;
        exerciseSubmissionLink: string;
    }

    interface CourseSpecialPart extends CoursePartDescriptionBase {
        type: 'special';
        requirements: string[];
    }

    type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is the easy course part',
            type: 'normal'
        },
        {
            name: 'Advanced',
            exerciseCount: 7,
            description: 'This is the hard course part',
            type: 'normal'
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            type: 'groupProject'
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
            type: 'submission'
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            type: 'special'
        }
    ];

    interface HeaderProps {
        name: string;
    }

    const Header = (props: HeaderProps) => {
        return <h1>{props.name}</h1>;
    };

    interface ContentProps {
        courses: CoursePart[];
    }

    const Content = (props: ContentProps) => {
        return (
            <>
                {props.courses.map(course =>
                    <Part key={course.name} part={course} />
                )}
            </>
        );
    };

    interface PartProps {
        part: CoursePart;
    }

    const assertNever = (value: never): never => {
        throw  new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };
    const Part = (props: PartProps) => {
        switch (props.part.type) {
            case 'normal':
                return <p><b>{props.part.name} {props.part.exerciseCount}</b><br /><i>{props.part.description}</i></p>;
            case 'groupProject':
                return <p><b>{props.part.name} {props.part.exerciseCount}</b><br />project
                    exercises {props.part.groupProjectCount}</p>;
            case 'submission':
                return <p><b>{props.part.name} {props.part.exerciseCount}</b><br /><i>{props.part.description}</i><br />submit
                    to {props.part.exerciseSubmissionLink}</p>;
            case 'special':
                return <p><b>{props.part.name} {props.part.exerciseCount}</b><br /><i>{props.part.description}</i><br />
                    required skills: {props.part.requirements.join()}
                </p>;
            default:
                return assertNever(props.part);
        }
    };

    interface TotalProps {
        courses: CoursePart[];
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