import EventRepository from "../repositories/event-repository.js";

export default class EventService {
    constructor() {
        this.eventRepository = new EventRepository();
    }

    getAllAsync = async (name, startDate, tag) => {
        return await this.eventRepository.getAllAsync(name, startDate, tag);
    }
    
    getByIdAsync = async(id) =>{
        return await this.eventRepository.getByIdAsync(id);
    }
}
