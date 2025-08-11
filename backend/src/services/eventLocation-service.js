import EventLocationRepository from "../repositories/eventLocation-repository.js";

export default class EventLocationService {
    constructor() {
        this.eventLocationRepository = new EventLocationRepository();
    }

    getAllAsync = async () => {
        return await this.eventLocationRepository.getAllAsync();
    }
    
    getAllCategoriesAsync = async () => {
        return await this.eventLocationRepository.getAllCategoriesAsync();
    }

    getAllByUserIdAsync = async (userId) => {
        return await this.eventLocationRepository.getAllByUserIdAsync(userId);
    }

    getAllPaginatedAsync = async (userId, page = 1, limit = 10) => {
        // Validar parámetros de paginación
        if (page < 1) page = 1;
        if (limit < 1 || limit > 100) limit = 10;
        
        return await this.eventLocationRepository.getAllPaginatedAsync(userId, page, limit);
    }
    
    getByIdAsync = async(id) =>{
        return await this.eventLocationRepository.getByIdAsync(id);
    }

    getByIdAndUserIdAsync = async(id, userId) =>{
        return await this.eventLocationRepository.getByIdAndUserIdAsync(id, userId);
    }

    createAsync = async(eventLocation) => {
        // Validaciones de negocio
        if (!eventLocation.name || eventLocation.name.length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres");
        }
        
        if (!eventLocation.full_address || eventLocation.full_address.length < 3) {
            throw new Error("La dirección debe tener al menos 3 caracteres");
        }
        
        if (!eventLocation.id_location) {
            throw new Error("El id_location es requerido");
        }
        
        if (!eventLocation.max_capacity || eventLocation.max_capacity <= 0) {
            throw new Error("La capacidad máxima debe ser mayor a 0");
        }

        return await this.eventLocationRepository.createAsync(eventLocation);
    }

    updateAsync = async(id, userId, eventLocation) => {
        // Validaciones de negocio (igual que create)
        if (!eventLocation.name || eventLocation.name.length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres");
        }
        
        if (!eventLocation.full_address || eventLocation.full_address.length < 3) {
            throw new Error("La dirección debe tener al menos 3 caracteres");
        }
        
        if (!eventLocation.id_location) {
            throw new Error("El id_location es requerido");
        }
        
        if (!eventLocation.max_capacity || eventLocation.max_capacity <= 0) {
            throw new Error("La capacidad máxima debe ser mayor a 0");
        }

        return await this.eventLocationRepository.updateAsync(id, userId, eventLocation);
    }

    deleteAsync = async(id, userId) => {
        return await this.eventLocationRepository.deleteAsync(id, userId);
    }
} 