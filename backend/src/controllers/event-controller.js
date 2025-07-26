import { Router } from "express";
import {StatusCodes} from 'http-status-codes';
import EventService from "../services/event-service.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

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

// Aplicar middleware de autenticación solo en la ruta POST
router.post('', authenticateToken, async (req, res) => {
    const {name,description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance} = req.body;
    
    // Usar el ID del usuario logueado como id_creator_user
    const id_creator_user = req.user.id;
    
    const event = await service.createEventAsync(name,description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
    if (event) {
        res.status(StatusCodes.OK).json(event);  // Si el evento existe, devolverlo
    } else {
        res.status(StatusCodes.NOT_FOUND).send("No se pudo crear el evento");
    }
});

export default router;