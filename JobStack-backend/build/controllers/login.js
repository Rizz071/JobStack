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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const service_1 = require("../services/service");
/* Receiving username and password from user, checking username and password in DB,
 * generating token, sending token back to user */
router.post("/", (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            /* Narrowing received payload from POST */
            const receivedUser = req.body;
            if (!receivedUser
                || typeof receivedUser !== "object"
                || !("username" in receivedUser)
                || !("password" in receivedUser)
                || !(0, service_1.isString)(receivedUser.username)
                || !(0, service_1.isString)(receivedUser.password)) {
                return res
                    .status(400)
                    .json({ message: "Username and password are required" });
            }
            const { username, password } = receivedUser;
            /* Searching for user in DB */
            const userFromDB = yield db_1.default.query(`SELECT * FROM users WHERE username = $1`, [username]);
            /* Narrowing received object from server
             * If no user is found, return an authentication error */
            if (!userFromDB ||
                typeof userFromDB !== "object" ||
                !("rowCount" in userFromDB) ||
                !("rows" in userFromDB) ||
                !Array.isArray(userFromDB.rows) ||
                userFromDB.rows.length === 0) {
                console.log("sdfsdfsdf");
                return res.status(401).json({ message: "Invalid username or password" });
            }
            /* Checking type of received id */
            const id = userFromDB.rows[0].id;
            if (!(0, service_1.isNumber)(id)) {
                return res.status(500).json({ message: "Invalid user ID in DB" });
            }
            /* User was founded in DB */
            const foundedUser = {
                id: Number(userFromDB.rows[0].id),
                username: String(userFromDB.rows[0].username),
                password: String(userFromDB.rows[0].password),
                fullname: String(userFromDB.rows[0].fullname)
            };
            /* Checking password */
            const passwordCorrect = yield bcrypt_1.default.compare(password, foundedUser.password);
            // If passwords don't match, return an authentication error
            if (!passwordCorrect) {
                return res.status(401).json({ message: "Invalid username or password" });
            }
            const userForToken = {
                username: String(foundedUser.username),
                id,
            };
            const token = jsonwebtoken_1.default.sign(userForToken, String(process.env.SECRET));
            res
                .status(200)
                .send({ id, token, username: userForToken.username, fullname: foundedUser.fullname });
        }
        catch (error) {
            next(error);
        }
        return;
    }))();
});
exports.default = router;
