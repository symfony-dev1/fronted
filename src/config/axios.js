import axios from 'axios';

// Set default base URL and headers
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
if (localStorage.getItem('access-token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access-token')}`;
}
export default axios;
