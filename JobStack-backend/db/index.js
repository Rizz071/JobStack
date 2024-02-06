const { Pool } = require('pg')
const { HOST, USER, DATABASE, PASSWORD, PORT_DB, MAX, IDLETIMEOUTMILLIS, CONNECTIONTIMEOUTMILLIS } = require('../services/config')

const pool = new Pool({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD,
    port: PORT_DB,
    max: MAX,
    idleTimeoutMillis: IDLETIMEOUTMILLIS,
    connectionTimeoutMillis: CONNECTIONTIMEOUTMILLIS,
})


const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}


module.exports = {
    query
}