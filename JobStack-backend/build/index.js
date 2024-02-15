"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import "dotenv/config";
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./controllers/users"));
const jobs_1 = __importDefault(require("./controllers/jobs"));
const status_1 = __importDefault(require("./controllers/status"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* Setup routers */
app.use("/api/users", users_1.default);
app.use("/api/", jobs_1.default);
app.use("/api/status/", status_1.default);
app.use(express_1.default.static('dist'));
/* MIDLLEWARE: unknown endpoint handling */
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);
/* MIDLLEWARE: error handling */
const errorHandler = (err, _req, res, _next) => {
    console.log("Error handler received error");
    if (!(err instanceof Error)) {
        return res.status(500).send("Error wasn't defined");
    }
    if (!("code" in err)) {
        return res.status(404).send(err.message);
    }
    switch (err.code) {
        case "42P01":
            return res.status(404).send("Error: users database not found");
        case "42P18":
            return res
                .status(404)
                .send("ERROR: could not determine data type of parameter $1");
        default:
            console.log(err);
            return res.status(500).send(err);
    }
};
app.use(errorHandler);
/* SERVER starts */
const start = () => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
};
start();
