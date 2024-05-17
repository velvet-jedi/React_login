import axios from 'axios';

// make HTTP requests to the specified base URL
// yhis ould be the node server running on port 3500
export default axios.create({
    baseURL: 'http://localhost:3500',
});

