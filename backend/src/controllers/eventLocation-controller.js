import { Router } from "express";
import {StatusCodes} from 'http-status-codes';
import EventLocationService from "../services/eventLocation-service.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

const router = Router();
const service = new EventLocationService();

// Rutas públicas (sin autenticación)
router.get('/all', async(req,res) => {
    try {
        const returnArray = await service.getAllAsync();

        if (returnArray != null) {
            return res.status(StatusCodes.OK).json(returnArray);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
})

router.get('/all-categories', async(req,res) => {
    try {
        const returnArray = await service.getAllCategoriesAsync();

        if (returnArray != null) {
            return res.status(StatusCodes.OK).json(returnArray);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
})

// Rutas con autenticación
// GET /api/events-locations - Obtener todas las ubicaciones del usuario autenticado
router.get('', authenticateToken, async (req, res) => {
    try {
        const returnArray = await service.getAllByUserIdAsync(req.user.id);

        if (returnArray != null) {
            return res.status(StatusCodes.OK).json(returnArray);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

// GET /api/events-locations/paginated?page=1&limit=10 - Obtener ubicaciones paginadas del usuario autenticado
router.get('/paginated', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const returnArray = await service.getAllPaginatedAsync(req.user.id, page, limit);

        if (returnArray != null) {
            return res.status(StatusCodes.OK).json({
                data: returnArray,
                page: page,
                limit: limit
            });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

// POST /api/events-locations - Crear nueva ubicación
router.post('', authenticateToken, async (req, res) => {
    try {
        const eventLocationData = {
            ...req.body,
            id_creator_user: req.user.id
        };

        const newEventLocation = await service.createAsync(eventLocationData);
        
        if (newEventLocation) {
            return res.status(StatusCodes.CREATED).json(newEventLocation);
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error al crear la ubicación");
        }
    } catch (error) {
        if (error.message.includes("debe tener al menos 3 caracteres") || 
            error.message.includes("es requerido") || 
            error.message.includes("debe ser mayor a 0")) {
            return res.status(StatusCodes.BAD_REQUEST).send(error.message);
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

// GET /api/events-locations/:id - Obtener ubicación específica del usuario autenticado
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const eventLocation = await service.getByIdAndUserIdAsync(id, req.user.id);

        if (eventLocation) {
            res.status(StatusCodes.OK).json(eventLocation);
        } else {
            res.status(StatusCodes.NOT_FOUND).send("Ubicación no encontrada");
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

// PUT /api/events-locations/:id - Actualizar ubicación existente
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const eventLocationData = req.body;

        const updatedEventLocation = await service.updateAsync(id, req.user.id, eventLocationData);
        
        if (updatedEventLocation) {
            return res.status(StatusCodes.OK).json(updatedEventLocation);
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("Ubicación no encontrada o no tienes permisos para editarla");
        }
    } catch (error) {
        if (error.message.includes("debe tener al menos 3 caracteres") || 
            error.message.includes("es requerido") || 
            error.message.includes("debe ser mayor a 0")) {
            return res.status(StatusCodes.BAD_REQUEST).send(error.message);
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

// DELETE /api/events-locations/:id - Eliminar ubicación
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await service.deleteAsync(id, req.user.id);

        if (deleted) {
            return res.status(StatusCodes.OK).send("Ubicación eliminada exitosamente");
        } else {
            return res.status(StatusCodes.NOT_FOUND).send("Ubicación no encontrada o no tienes permisos para eliminarla");
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

export default router;