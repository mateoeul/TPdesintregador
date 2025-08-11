import axios from 'axios';
const API_URL = 'http://localhost:3000/api/events-locations';

const eventLocationsService = {
    
    async getAllLocations() {
        try {
            const response = await axios.get(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch events";
            throw new Error(message);
        }
    },
    async getAllCategories() {
        try {
            const response = await axios.get(`${API_URL}/all-categories`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch events";
            throw new Error(message);
        }
    },
}

export default eventLocationsService;