import { Router } from "express"
import pgPromise from 'pg-promise';

const pgp = pgPromise()
const db = pgp({
    host: 'ep-quiet-snow-a6bzlu38.us-west-2.retooldb.com',
    port: 5432,
    database: 'retool',
    user: 'retool',
    password: process.env.DB_PASSWORD,
    ssl: true 
})

const router = Router()



router.post('/', async (req, res) => {
    const { name, email, pass } = req.body;

    if (!name || !email || !pass) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
        const result = await db.oneOrNone(
            'INSERT INTO todo.person ("name", email, pass) VALUES (${name}, ${email}, ${pass}) ON CONFLICT (email) DO NOTHING RETURNING *',
            { name, email, pass }
        );

        if (result) {

            res.status(201).json(result);
        } else {
            res.status(409).json({ error: 'Email already exists' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

















export default router;