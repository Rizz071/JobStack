const router = require('express').Router()
const db = require('../db')


/* Request all users from DB */
router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM users')
        res.status(200).send(result.rows)
    }
    catch (error) {
        next(error)
    }
})



/* Request one user by ID from DB */
router.get('/:id', async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT * FROM users WHERE id = $1`,
            [req.params.id])

        /* If user not found throwing error to error handler middleware */
        if (!result.rowCount) throw Error(`user with ID ${req.params.id} not found in DB`)

        res.send(result.rows[0])
    }
    catch (error) {
        next(error)
    }
})

/* Adding new user to users DB */
router.post('/', async (req, res, next) => {
    const { username, fullname, password } = req.body

    try {
        await db.query(
            `INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3)`,
            [username, password, fullname])

        res.status(201).send(req.body)
    }
    catch (error) {
        next(error)
    }
})

/* Deleting user by ID */
router.delete('/:id', async (req, res, next) => {
    try {
        await db.query(
            `DELETE FROM users WHERE id = $1`,
            [req.params.id])

        /* Sending No Content if success*/
        res.status(204)
    }
    catch (error) {
        next(error)
    }
})

/* Adding new user to users DB */
router.put('/:id', async (req, res, next) => {
    const { username, fullname, password } = req.body
    const user_id = req.params.id

    try {
        await db.query(
            `UPDATE users
                SET username = $1, password = $2, fullname = $3
                WHERE id = $4`,
            [username, password, fullname, user_id])

        res.status(201).send(req.body)
    }
    catch (error) {
        next(error)
    }
})


module.exports = router
