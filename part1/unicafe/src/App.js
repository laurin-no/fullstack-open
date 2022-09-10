import {useState} from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({text, value}) => <tr>
    <td>{text}</td>
    <td>{value}</td>
</tr>

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const avg = (good - bad) / total
    const positive = good / total
    const positiveFormatted = `${positive * 100} %`

    if (total === 0) {
        return (
            <div>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                <StatisticsLine text="good" value={good}/>
                <StatisticsLine text="neutral" value={neutral}/>
                <StatisticsLine text="bad" value={bad}/>
                <StatisticsLine text="all" value={total}/>
                <StatisticsLine text="average" value={avg}/>
                <StatisticsLine text="positive" value={positiveFormatted}/>
                </tbody>
            </table>
        </div>)
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={() => setGood(good + 1)} text={"good"}/>
            <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
            <Button handleClick={() => setBad(bad + 1)} text={"bad"}/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App