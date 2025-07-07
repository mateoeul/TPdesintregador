import { Router } from "express";
import EventService from "../services/event-service.js";

const router = Router();
const service = new EventService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await service.getAllAsync()

    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray)
    } 
    else{
        respuesta = res.status(500).json("Internal error")
    }
    return respuesta;
})

export default router;