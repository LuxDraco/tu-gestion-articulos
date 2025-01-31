import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b',
    headers: {
        'X-Master-Key': import.meta.env.VITE_JSONBIN_KEY
    }
});