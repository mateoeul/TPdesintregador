import DBconfig from '../configs/dbConfig.js'
import pkg from 'pg'

const {Client, Pool} = pkg;

export default class EventRepository {

    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBconfig)

        try {
            await client.connect()
            const sql = "SELECT * FROM "
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        } catch (error) {  
            console.log(error)
        }
        return returnArray;
    }

    //getByIdAsync = async() => {   }
}