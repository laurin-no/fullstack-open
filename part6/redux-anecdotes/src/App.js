import AnecdoteList from './components/AnecdoteList'

const App = () => {

    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList/>
            <h2>create new</h2>
            <form>
                <div><input/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App