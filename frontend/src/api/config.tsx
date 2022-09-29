import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://commerse.onrender.com/'
})
export default instance