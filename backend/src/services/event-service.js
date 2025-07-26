import EventRepository from "../repositories/event-repository.js";
import EventLocationRepository from "../repositories/eventLocation-repository.js";

export default class EventService {
    constructor() {
        this.eventRepository = new EventRepository();
        this.eventLocationRepository = new EventLocationRepository();
    }

    getAllAsync = async (name, startDate, tag) => {
        return await this.eventRepository.getAllAsync(name, startDate, tag);
    }
    
    getByIdAsync = async(id) =>{
        return await this.eventRepository.getByIdAsync(id);
    }

    createEventAsync = async(name,description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) => {
        if (!name || !description || description.lenght < 3 || name.lenght < 3){
            return {
                status: 400,
                body: { success: false, message: "El nombre o la descripción son inválidos." }
            };
        }

        // Validar que max_assistance no sea mayor que max_capacity del event_location
        const eventLocation = await this.eventLocationRepository.getByIdAsync(id_event_location);
        if (!eventLocation) {
            return {
                status: 400,
                body: { success: false, message: "La ubicación del evento no existe." }
            };
        }

        if (price < 0 || max_assistance < 0 ) {
            return {
                status: 400,
                body: { success: false, message: "El precio o la asistencia máxima no pueden ser negativos." }
            };
        }
        if (max_assistance > eventLocation.max_capacity) {
            return {
                status: 400,
                body: { success: false, message: "La asistencia máxima no puede superar la capacidad del lugar." }
            };
        }

        return await this.eventRepository.createEventAsync(name,description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
    }
}
