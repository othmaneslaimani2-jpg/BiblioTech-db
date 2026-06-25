import express from 'express';
import { Pool } from 'pg';
const app = express()
app.use(express.json())
const main = async () => {
    try {
        const pool = new Pool({
            password: "1234",
            user: "othmane",
            database: "Bibliotech_db",
            host: "localhost",
            port: 5432,
        })
        const db = await pool.connect()
        console.log("DB is Connected")
        const createTableBooks = `CREATE TABLE IF NOT EXISTS livres (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            author_name VARCHAR(100),
            category VARCHAR(100),
            is_available BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        
        await db.query(createTableBooks)
        app.get("/", (req, res) => {
            res.json({
                message: "Bienvenue d'ans l'API Bibliotech"
            })
        });
        app.get("/livres", async (req, res) => {
            try {
                const result = await pool.query("SELECT * FROM livres");
                res.status(200).json(result.rows);
            
            } catch (error) {
                res.status(500).json({
                    message: "Server Error",
                    error: error.message
                });
            }
        })
        app.post("/livres", async (req, res) => {
            try {
                const { name, authorName, category, isAvailable, created_at } = req.body
                const insertQuery = `
INSERT INTO livres
(name, author_name, category, is_available, created_at)
VALUES ($1, $2, $3, $4, $5)
`;
                await db.query(insertQuery, [name, authorName, category, isAvailable, created_at])
                res.status(201).json({ message: "The Books has been created" })
            } catch (_err) {
                console.log(_err)
                res.status(403).json({ error: 'Error Occured please provide all information needed' })
            }
        })

        app.listen(5433, () => console.log("This app is listning on port 5433"))
    } catch (error) {
        console.log("Oups something went wrong!")
    }

}

main()