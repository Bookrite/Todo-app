import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import pgPromise from 'pg-promise';
//
const pgp = pgPromise()
const db = pgp({
    host: 'ep-quiet-snow-a6bzlu38.us-west-2.retooldb.com',
    port: 5432,
    database: 'retool',
    user: 'retool',
    password: process.env.DB_PASSWORD,
    ssl: true
})

const app = express()
app.use(cors())
app.use(express.json())





app.post('/login', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
    let id = await db.one('select id from todo.person  where email = $1', [req.body.id])
    console.log(id)
    try {
        const result = await db.one('insert into todo.task (title, user_id) values (${title}, ${user_id}) returning *', {
            title: req.body.title,
            user_id: id.id
        })
        console.log('result', result)
        res.json({
            title: result.title,
            done: result.done,
            id: result.id
        })
    } catch (err) { res.json(err) }
})

app.post('/user', async (req, res) => {
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

app.get('/tasks', async (req, res) => {
    try {
        const user_id = await db.one('select id from todo.person p where email = $1', [req.query.username]);
        const result = await db.manyOrNone('select * from todo.task where deleted_at is null and user_id = $1', [user_id.id]);

        res.json(result.map(task => ({ id: task.id, title: task.title, done: task.status !== 'active' })))
    } catch (err) { console.log(err) }
})

app.patch('/tasks/:id', async (req, res) => {
    try {
        const userId = await db.one('select id 	from todo.person p where email = $1', [req.query.username])
        console.log(userId)
        await db.none("update todo.task set status = 'done' where id = $1 and  user_id = $2", [req.params.id, userId.id])
        res.json({ ok: true })
    } catch (err) { console.log(err) }
}) 
 



app.delete('/tasks/:id', async (req, res) => {
    try {
        const userId = await db.one('select id 	from todo.person p where email = $1', [req.query.username])
        await db.none("update todo.task set deleted_at = now() where id = $1 and  user_id = $2", [Number(req.params.id), userId.id])
        res.json({ ok: true })
    } catch (err) { console.log(err) }
})



app.listen('3000', () => {
    console.log('the server is now running and listening for requests')
})