import db from "../configs/dbConfig.js";

const UserRepository = {
    async findByUsername(username) {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        return result.rows[0];
    },
    async create({ first_name, last_name, username, password }) {
        await db.query(
            "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
            [first_name, last_name, username, password]
        );
    }
};

export default UserRepository; 