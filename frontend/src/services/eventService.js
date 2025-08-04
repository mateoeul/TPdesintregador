import axios from 'axios';
const API_URL = 'http://localhost:3000/api/events/';

const eventService = {

    async getAll(name, tag, startDate) {
        try {
            const params = {};
            if (name) params.name = name;
            if (tag) params.tag = tag;
            if (startDate) params.startDate = startDate;

            // si hay params, axios los convierte en query string
            const response = await axios.get(API_URL, { params });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch events";
            throw new Error(message);
        }
    }
};

export default eventService;