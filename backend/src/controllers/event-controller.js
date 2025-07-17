import { Router } from "express";
import {StatusCodes} from 'http-status-codes';
import EventService from "../services/event-service.js";

const router = Router();
const service = new EventService();

router.get('', async (req, res) => {
    const { name, startdate, tag } = req.query;

    const returnArray = await service.getAllAsync(name, startdate, tag);

    if (returnArray != null) {
        return res.status(StatusCodes.OK).json(returnArray);
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal error");
    }
});

export default router;