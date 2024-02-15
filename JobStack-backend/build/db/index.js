"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
require("dotenv/config");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    // host: process.env.HOST,
    // user: 
    //     process.env.NODE_ENV !== "development"
    //         ? process.env.USER
    //         : process.env.USER_TEST,   
    database: process.env.NODE_ENV !== "development"
        ? process.env.DATABASE
        : process.env.DATABASE_TEST,
    password: process.env.NODE_ENV !== "development"
        ? process.env.PASSWORD
        : process.env.PASSWORD_TEST,
    port: Number(process.env.PORT_DB),
    max: Number(process.env.MAX),
    idleTimeoutMillis: Number(process.env.IDLETIMEOUTMILLIS),
    connectionTimeoutMillis: Number(process.env.CONNECTIONTIMEOUTMILLIS),
});
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    const res = yield pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
});
exports.default = { query };
