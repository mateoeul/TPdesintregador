import EventRepository from "../repositories/event-repository.js";

export default class EventService {

    constructor() {

        this.eventRepository = new EventRepository();
    }

    getAllAsync = async () => {
        const returnArray = await this.eventRepository.getAllAsync();
        return returnArray;
    }

}