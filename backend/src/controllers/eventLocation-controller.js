import { Router } from "express";
import {StatusCodes} from 'http-status-codes';
import EventLocationService from "../services/eventLocation-service.js";

const router = Router();
const service = new EventLocationService();

router.get('', async (req, res) => {
    const returnArray = await service.getAllAsync();

    if (returnArray != null) {
        return res.status(StatusCodes.OK).json(returnArray);
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;  // Acceder al ID de la URL
    const eventLocation = await service.getByIdAsync(id);  // Buscar la ubicación en la base de datos

    if (eventLocation) {
        res.status(StatusCodes.OK).json(eventLocation);  // Si existe, devolverlo
    } else {
        res.status(StatusCodes.NOT_FOUND).send("Ubicación no encontrada");
    }
});

export default router;