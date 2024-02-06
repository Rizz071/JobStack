require('dotenv').config()

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
    SECRET: process.env.SECRET,
    HOST: process.env.HOST,
    USER: process.env.USER,
    DATABASE: process.env.DATABASE,
    PASSWORD: process.env.PASSWORD,
    PORT_DB: process.env.PORT_DB,
    MAX: process.env.MAX,
    IDLETIMEOUTMILLIS: process.env.IDLETIMEOUTMILLIS,
    CONNECTIONTIMEOUTMILLIS: process.env.CONNECTIONTIMEOUTMILLIS
}