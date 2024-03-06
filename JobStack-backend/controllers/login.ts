import express = require("express");
import { UserObject } from "../types";
import { Request, Response, NextFunction } from "express";

const router = express();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../db";
import { isNumber, isString } from "../services/service";

/* Receiving username and password from user, checking username and password in DB,
 * generating token, sending token back to user */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
    void (async () => {
        try {
            /* Narrowing received payload from POST */
            const receivedUser: unknown = req.body;

            if (
                !receivedUser
                || typeof receivedUser !== "object"
                || !("username" in receivedUser)
                || !("password" in receivedUser)
                || !isString(receivedUser.username)
                || !isString(receivedUser.password)
            ) {
                return res
                    .status(400)
                    .json({ message: "Username and password are required" });
            }
            const { username, password } = receivedUser;

            /* Searching for user in DB */
            const userFromDB: unknown = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);

            /* Narrowing received object from server 
             * If no user is found, return an authentication error */
            if (
                !userFromDB ||
                typeof userFromDB !== "object" ||
                !("rowCount" in userFromDB) ||
                !("rows" in userFromDB) ||
                !Array.isArray(userFromDB.rows) ||
                userFromDB.rows.length === 0
            ) {
                console.log("sdfsdfsdf");
                return res.status(401).json({ message: "Invalid username or password" });
            }

            /* User was founded in DB */
            const foundedUser: UserObject = {
                username: String(userFromDB.rows[0].username),
                password: String(userFromDB.rows[0].password),
                fullname: String(userFromDB.rows[0].fullname)
            };

            /* Checking password */
            const passwordCorrect: boolean = await bcrypt.compare(password, foundedUser.password);

            // If passwords don't match, return an authentication error
            if (!passwordCorrect) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            /* Checking type of received id */
            const id: unknown = userFromDB.rows[0].id;
            if (!isNumber(id)) {
                return res.status(500).json({ message: "Invalid user ID in DB" });
            }

            const userForToken = {
                username: String(foundedUser.username),
                id,
            };

            const token = jwt.sign(userForToken, String(process.env.SECRET));

            res
                .status(200)
                .send({ token, username: userForToken.username, fullname: foundedUser.fullname });

        } catch (error) {
            next(error);
        }

        return;
    })();
});

export default router;