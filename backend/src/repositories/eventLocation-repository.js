import DBconfig from '../configs/dbConfig.js'
import pkg from 'pg'

const { Client } = pkg;

export default class EventLocationRepository {

    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBconfig)

        try {
            await client.connect();
            const result = await client.query("SELECT * FROM event_locations");
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log("Error en getAllAsync:", error);
        }

        return returnArray;
    }

    getByIdAsync = async(id) =>{
        const client = new Client(DBconfig);
        try {
            await client.connect();
            const result = await client.query("SELECT * FROM event_locations WHERE id = $1", [id]);
            await client.end();
            return result.rows[0]; // Devuelve solo una ubicación
        } catch (error) {
            console.log("Error en getByIdAsync:", error);
            return null;
        }
    }
} 