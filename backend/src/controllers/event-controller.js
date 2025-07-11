import { Router } from "express";
import {StatusCodes} from 'http-status-codes';
import EventService from "../services/event-service.js";

const router = Router();
const service = new EventService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await service.getAllAsync()

    if (returnArray != null) {
        respuesta = res.status(StatusCodes.OK).json(returnArray)
    } 
    else{
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error")
    }
    return respuesta;
})

export default router;