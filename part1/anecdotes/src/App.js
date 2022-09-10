import {useState} from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Anecdote = ({anecdotes, votes, selected}) => {
    return (
        <div>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const random = () => Math.floor(Math.random() * anecdotes.length)
    const saveVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        return setVotes(copy)
    }
    const favAnecdoteIndex = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <Anecdote anecdotes={anecdotes} selected={selected} votes={votes}/>
            <Button handleClick={() => saveVote()} text="vote"/>
            <Button handleClick={() => setSelected(random)} text="next anecdote"/>

            <h2>Anecdote with most votes</h2>
            <Anecdote anecdotes={anecdotes} selected={favAnecdoteIndex} votes={votes}/>
        </div>
    )
}

export default App