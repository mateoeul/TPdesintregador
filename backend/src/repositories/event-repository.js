import DBconfig from '../configs/dbConfig.js'
import pkg from 'pg'

const {Client, Pool} = pkg;

export default class EventRepository {

    getAllAsync = async (name, startDate, description) => {
        let returnArray = null;
        const client = new Client(DBconfig)
        
        try {
            await client.connect()
            const sql = "SELECT * FROM events WHERE 1=1"
            //el siguiente es el array para establecer los parametros
            const values = []
            let count  = 1;

            if (name) {
                sql += `AND LOWER(name) LIKE LOWER(${name})`
                values.push(`%${name}%`);
                count++;
            }

            if (startDate) {
                sql += `AND LOWER DATE(start_date) = $${count})`
                values.push(startDate)
                count++;
            }

            if (tag) {
                sql += `AND LOWER(description) LIKE LOWER($${count})`
                values.push(`%${description}%`);
                count++;
            }

            const result = await client.query(sql, values)
            await client.end()
            returnArray = result.rows
            
        } catch (error) {  
            console.log(error)
        }
        return returnArray;
    }

    //getByIdAsync = async() => {   }
}