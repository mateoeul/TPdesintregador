import DBconfig from '../configs/dbConfig.js'
import pkg from 'pg'

const { Client } = pkg;

export default class EventRepository {

    getAllAsync = async (name, startDate, tag) => {
        let returnArray = null;
        const client = new Client(DBconfig)

        try {
            await client.connect();

            let sql = "SELECT * FROM events WHERE 1=1";
            const values = [];
            let count = 1;

            if (name) {
                sql += ` AND LOWER(name) LIKE LOWER($${count})`;
                values.push(`%${name}%`);
                count++;
            }

            if (startDate) {
                sql += ` AND DATE(start_date) = $${count}`;
                values.push(startDate);
                count++;
            }

            if (tag) {
                sql += ` AND LOWER(description) LIKE LOWER($${count})`;
                values.push(`%${tag}%`);
                count++;
            }

            const result = await client.query(sql, values);
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
            const result = await client.query("SELECT * FROM events WHERE id = $1", [id]);
            await client.end();
            return result.rows[0]; // Devuelve solo un evento
            
        } catch (error) {
            console.log("Error en getByIdAsync:", error);
            return null;
        }
    }
}
