import express, { Request, Response, NextFunction } from "express"

// const express = require('express')
const app = express()


const { PORT } = require('./services/config')

const usersRouter = require('./controllers/users')
const jobsRouter = require('./controllers/jobs')


app.use(express.json())

/* Setup routers */
app.use('/api/users', usersRouter)
app.use('/api/', jobsRouter)



/* MIDLLEWARE: unknown endpoint handling */
const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


/* MIDLLEWARE: error handling */
const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.log('Error handler received error')

    if (!(err instanceof Error) || !('code' in err)) {
        return res.status(500).send('Unknown server error! Error object didn\'t come')
    }


    switch (err.code) {
        case '42P01':
            return res.status(404).send('ERROR: users database not found')
        case '42P18':
            return res.status(404).send('ERROR: could not determine data type of parameter $1')


        default:
            console.log(err)
            return res.status(500).send(err)
    }
}
app.use(errorHandler)


/* SERVER starts */
const start = async () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()