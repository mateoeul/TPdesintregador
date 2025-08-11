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

    // Obtener ubicaciones del usuario autenticado
    async getUserLocations() {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const token = storedUser?.token;
            const response = await axios.get(`${API_URL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch user locations";
            throw new Error(message);
        }
    },

    // Obtener ubicaciones paginadas del usuario autenticado
    async getUserLocationsPaginated(page = 1, limit = 10) {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const token = storedUser?.token;
            const response = await axios.get(`${API_URL}/paginated?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch user locations";
            throw new Error(message);
        }
    },

    // Obtener ubicación específica del usuario autenticado
    async getLocationById(id) {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const token = storedUser?.token;
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch location";
            throw new Error(message);
        }
    },

    // Crear nueva ubicación
    async createLocation(locationData) {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const token = storedUser?.token;
            const response = await axios.post(`${API_URL}`, locationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data || "Failed to create location";
            throw new Error(message);
        }
    },

    // Actualizar ubicación existente
    async updateLocation(id, locationData) {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const token = storedUser?.token;
            const response = await axios.put(`${API_URL}/${id}`, locationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data || "Failed to update location";
            throw new Error(message);
        }
    },

    // Eliminar ubicación
    async deleteLocation(id) {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const token = storedUser?.token;
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data || "Failed to delete location";
            throw new Error(message);
        }
    }
}

export default eventLocationsService;