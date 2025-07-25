import { Router } from "express";
import {StatusCodes} from 'http-status-codes';
import EventService from "../services/event-service.js";

const router = Router();
const service = new EventService();

router.get('', async (req, res) => {
    const { name, startDate, tag } = req.query;

    const returnArray = await service.getAllAsync(name, startDate, tag);

    if (returnArray != null) {
        return res.status(StatusCodes.OK).json(returnArray);
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;  // Acceder al ID de la URL
    const event = await service.getByIdAsync(id);  // Buscar el evento en la base de datos

    if (event) {
        res.status(StatusCodes.OK).json(event);  // Si el evento existe, devolverlo
    } else {
        res.status(StatusCodes.NOT_FOUND).send("Evento no encontrado");
    }
});

export default router;