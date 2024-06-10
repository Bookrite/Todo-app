


















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