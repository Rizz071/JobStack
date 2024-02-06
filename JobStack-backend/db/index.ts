/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database:
    process.env.NODE_ENV !== "development"
      ? process.env.DATABASE
      : process.env.DATABASE_TEST,
  password: process.env.PASSWORD,
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
