import axios from 'axios'


const getCustomers = axios.create({
    baseURL: 'http://localhost:5000/customers/api',
    headers: {
    'Content-Type': 'application/json'
    }
})

export {getCustomers};