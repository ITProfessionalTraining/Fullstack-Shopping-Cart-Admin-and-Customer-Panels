import axios from 'axios'


const getProducts = axios.create({
    baseURL: 'http://localhost:5000/products',
    headers: {
    'Content-Type': 'application/json'
    }
})

export {getProducts};