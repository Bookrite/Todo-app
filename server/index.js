import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import pgPromise from 'pg-promise';
const port = process.env.port
import tasksRoute from './routs/tasks.js'
import loginRoute from './routs/login.js'
import userRoutr from './routs/user.js'
//
const app = express()
app.use(cors())
app.use(express.json())

app.use('/tasks' , tasksRoute);
app.use('/login' , loginRoute);
app.use('/user' , userRoutr)





const pgp = pgPromise()
const db = pgp({
    host: 'ep-quiet-snow-a6bzlu38.us-west-2.retooldb.com',
    port: 5432,
    database: 'retool',
    user: 'retool',
    password: process.env.DB_PASSWORD,
    ssl: true
})

































 















app.listen(port, () => {
    console.log(`the server is now running and listening for requests on port ${port}`)
})