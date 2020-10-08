import axios from 'axios'

const instance = axios.create({
    baseURL: 'localhost:9000'
})

export default instance

