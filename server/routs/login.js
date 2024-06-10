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
    let username = req.body.username;
    let password = req.body.password;
    try {
        const result = await db.one('select * from todo.person  where email = $1 and pass = $2', [username, password])
        console.log('result', result)

        res.json(
            { ok: true }
        )
    }

    catch (error) {
        res.json({ ok: false })
    }
})







export default router

