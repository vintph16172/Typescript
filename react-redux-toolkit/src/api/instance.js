import axios from 'axios'

const instance = axios.create({
    baseURL:"https://fastfood-web-demo.herokuapp.com/api"
})
export default instance