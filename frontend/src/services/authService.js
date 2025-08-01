import axios from 'axios';
const API_URL = 'http://localhost:3000/api/user/';

const authService = {
        
    async login(username, password) {
        try {
            const response = await axios.post(`${API_URL}login`, { username, password });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;

        } catch (error) {
                const message = error.response?.data?.message || "Login failed";
                throw new Error(message);
        }
    },

    async register(user) {
        try {
            const response = await axios.post(`${API_URL}register`, user);
            return response.data;
        } catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    },
}

export default authService