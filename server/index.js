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





















app.listen('3000', () => {
    console.log('the server is now running and listening for requests')
})