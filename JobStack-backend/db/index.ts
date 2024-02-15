/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
	host:         
        process.env.NODE_ENV !== "development"
            ? process.env.HOST
            : process.env.HOST_TEST, 
	user: 
        process.env.NODE_ENV !== "development"
            ? process.env.USER
            : process.env.USER_TEST,   
	database:
		process.env.NODE_ENV !== "development"
			? process.env.DATABASE
			: process.env.DATABASE_TEST,
	password: 
        process.env.NODE_ENV !== "development"
            ? process.env.PASSWORD
            : process.env.PASSWORD_TEST,    
	port: Number(process.env.PORT_DB),
	max: Number(process.env.MAX),
	idleTimeoutMillis: Number(process.env.IDLETIMEOUTMILLIS),
	connectionTimeoutMillis: Number(process.env.CONNECTIONTIMEOUTMILLIS),
});

const query = async (text: string, params?: unknown[]) => {
	const start = Date.now();
	const res = await pool.query(text, params);
	const duration = Date.now() - start;
	console.log("executed query", { text, duration, rows: res.rowCount });
	return res;
};

export default { query };
