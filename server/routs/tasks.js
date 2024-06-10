



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



app.get('/tasks', async (req, res) => {
    try {
        const user_id = await db.one('select id from todo.person p where email = $1', [req.query.username]);
        const result = await db.manyOrNone('select * from todo.task where deleted_at is null and user_id = $1', [user_id.id]);

        res.json(result.map(task => ({ id: task.id, title: task.title, done: task.status !== 'active' })))
    } catch (err) { console.log(err) }
})


app.delete('/tasks/:id', async (req, res) => {
    try {
        const userId = await db.one('select id 	from todo.person p where email = $1', [req.query.username])
        await db.none("update todo.task set deleted_at = now() where id = $1 and  user_id = $2", [Number(req.params.id), userId.id])
        res.json({ ok: true })
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
 