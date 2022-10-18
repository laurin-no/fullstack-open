import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const res = await axios.post(baseUrl, object)
    return res.data
}

const update = async (object) => {
    const res = await axios.put(`${baseUrl}/${object.id}`, object)
    return res.data
}

export default { getAll, createNew, update }