import axios from 'axios';
const BASE_URL = 'http://localhost:3500'; // where the node backend will run

// default instance of axios for all requrests 
export default axios.create({
    baseURL: BASE_URL
});

// private instance to handle tokens
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json', // let the API know that the request will have JSON format
    },
    withCredentials: true
})


