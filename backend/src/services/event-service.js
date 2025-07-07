import EventRepository from "../repositories/event-repository.js";

export default class EventService {

    getAllAsync  = async ()=>{
        const repositorio = new EventRepository();
        const returnArray = repositorio.getAllAsync()
        return returnArray;
    }   

}