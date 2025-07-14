import EventRepository from "../repositories/event-repository.js";

export default class EventService {

    constructor() {

        this.eventRepository = new EventRepository();
    }

    getAllAsync = async (name, startDate, description) => {
        const returnArray = await this.eventRepository.getAllAsync(name, startDate, description);
        return returnArray;
    }

}