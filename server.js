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
        });
        app.get("/livres/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM livres WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Livre non trouvé"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
});
app.put("/livres/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {  name, authorName, category, isAvailable, created_at  } = req.body;

        const result = await pool.query(
            `UPDATE livres
             SET name=$1,
                 author_name=$2,
                 category=$3,
                 is_available=$4,
                 created_at=$5
             WHERE id=$6
             RETURNING *`,
            [ name, authorName, category, isAvailable, created_at , id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Livre non trouvé"
            });
        }

        res.status(200).json({
            message: "Livre modifié avec succès",
            livre: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
}); 
 app.delete("/livres/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM livres WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
});
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