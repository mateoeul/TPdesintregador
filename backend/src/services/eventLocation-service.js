import EventLocationRepository from "../repositories/eventLocation-repository.js";

export default class EventLocationService {
    constructor() {
        this.eventLocationRepository = new EventLocationRepository();
    }

    getAllAsync = async () => {
        return await this.eventLocationRepository.getAllAsync();
    }
    
    getByIdAsync = async(id) =>{
        return await this.eventLocationRepository.getByIdAsync(id);
    }
} 