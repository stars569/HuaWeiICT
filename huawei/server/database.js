import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
    password: 'sichenfeia1a1a1',
    host: 'localhost',
    database: 'ICT',
    port: 5432
})

async function initDB(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `)
}

const db = {
    async createUser(user){
        const res = await pool.query(`
            INSERT INTO users (username, password) VALUES ($1, $2)
        `, [user.username, user.password])
        return res.rows[0]
    }
}

export {
    db,
    initDB
}