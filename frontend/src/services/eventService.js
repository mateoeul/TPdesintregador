import axios from 'axios';
const API_URL = 'http://localhost:3000/api/events/';

const eventService = {

    async getAll() {
        try {
            const response = await axios.get(`${API_URL}events`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch events";
            throw new Error(message);
        }
    }
};

export default eventService;