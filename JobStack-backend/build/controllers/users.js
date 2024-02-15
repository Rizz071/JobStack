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
const db_1 = __importDefault(require("../db"));
const service_1 = require("../services/service");
/* Request all users from DB */
router.get("/", (_req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query("SELECT * FROM users");
            /* Narrowing received object from server */
            if (!result ||
                typeof result !== "object" ||
                !("rowCount" in result) ||
                !("rows" in result) ||
                !Array.isArray(result.rows)) {
                throw new Error("received invalid user object from server");
            }
            res.status(200).send(result.rows);
        }
        catch (error) {
            next(error);
        }
    }))();
});
/* Request one user by ID from DB */
router.get("/:id", (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);
            /* Narrowing received object from server */
            if (!result ||
                typeof result !== "object" ||
                !("rowCount" in result) ||
                !("rows" in result) ||
                !Array.isArray(result.rows)) {
                throw new Error("received invalid user object from server");
            }
            /* If user not found throwing error to error handler middleware */
            if (!result.rowCount) {
                throw new Error(`user with ID ${req.params.id} not found in DB`);
            }
            res.send(result.rows[0]);
        }
        catch (error) {
            next(error);
        }
    }))();
});
/* Adding new user to users DB */
router.post("/", (req, res, next) => {
    // const { username, fullname, password }: UserObject = req.body as UserObject;
    const obj = req.body;
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            /* Narrowing username, password and fullname.
             * fullname must exist in req.body
             */
            if (!obj ||
                typeof obj !== "object" ||
                !("username" in obj) ||
                !("password" in obj) ||
                !("fullname" in obj) ||
                !(0, service_1.isString)(obj.username) ||
                !(0, service_1.isString)(obj.password) ||
                !(0, service_1.isString)(obj.fullname)) {
                throw Error("corrupted data or some field absent in job object received from server");
            }
            const { username, password, fullname } = obj;
            yield db_1.default.query(`INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3)`, [username, password, fullname]);
            res.status(201).send(req.body);
        }
        catch (error) {
            next(error);
        }
    }))();
});
/* Deleting user by ID */
router.delete("/:id", ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query(`DELETE FROM users WHERE id = $1`, [req.params.id]);
        /* Sending No Content if success*/
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
})));
/* Adding new user to users DB */
router.put("/:id", ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, fullname, password } = req.body;
    const user_id = req.params.id;
    try {
        yield db_1.default.query(`UPDATE users
                SET username = $1, password = $2, fullname = $3
                WHERE id = $4`, [username, password, fullname, user_id]);
        res.status(201).send(req.body);
    }
    catch (error) {
        next(error);
    }
})));
exports.default = router;
