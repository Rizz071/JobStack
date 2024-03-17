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
/* Request statuses for multiple jobs by array of job_id */
router.post("/multiple", (req, res, next) => {
    // console.log(req.body);
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query(`SELECT *
                FROM job_status WHERE job_id = ANY ($1)`, [req.body.jobs_array]);
            /* Narrowing received object from server */
            if (!result || typeof result !== "object" || !("rows" in result)) {
                throw Error("received invalid array of job statuses from server");
            }
            res.status(200).send(result.rows);
        }
        catch (error) {
            next(error);
        }
    }))();
});
/* Request all job statuses for one job by id === job_id */
router.get("/:id", (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query(`SELECT id, position, status, status_desc, date
                FROM job_status WHERE job_id = $1 ORDER BY position DESC`, [req.params.id]);
            /* Narrowing received object from server */
            if (!result || typeof result !== "object" || !("rows" in result)) {
                throw Error("received invalid array of job statuses from server");
            }
            res.status(200).send(result.rows);
        }
        catch (error) {
            next(error);
        }
    }))();
});
/* Adding new status for one job by id === job_id */
router.post("/:id", (req, res, next) => {
    //TODO not safe
    const { position, status, status_desc, date } = req.body;
    const job_id = req.params.id;
    console.log(req.body);
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.query(`INSERT INTO job_status (job_id, position, status, status_desc, date)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`, [job_id, position, status, status_desc, date]);
            /* Narrowing received object from server */
            if (!result ||
                typeof result !== "object" ||
                !("rowCount" in result) ||
                !("rows" in result) ||
                !Array.isArray(result.rows)) {
                throw new Error("received invalid status object from server");
            }
            res.status(201).send(result.rows[0]);
        }
        catch (error) {
            next(error);
        }
    }))();
});
/* Deleting one job status by id === status_id */
router.delete("/:id", (req, res, next) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.default.query(`DELETE CASCADE job_status WHERE id = $1`, [
                req.params.id,
            ]);
            /* Sending No Content if success*/
            // res.status(204).send("item deleted");
            res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }))();
});
/* Deleting ALL job statuses by id === job_id */
// router.delete("/all/:id", (req: Request, res: Response, next: NextFunction) => {
// 	void (async () => {
// 		try {
// 			await db.query(`DELETE FROM job_status WHERE job_id = $1`, [
// 				req.params.id,
// 			]);
// 			/* Sending No Content if success*/
// 			// res.status(204).send("item deleted");
// 			res.sendStatus(204);
// 		} catch (error) {
// 			next(error);
// 		}
// 	})();
// });
/* Changing one job status by id === job_id */
router.put(":id", (req, res, next) => {
    const { position, status, status_desc, date } = req.body;
    const id = req.params.id;
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db_1.default.query(`UPDATE job_status
                SET position = $1, status = $2, status_desc = $3, date = $4
                WHERE job_id = $5`, [position, status, status_desc, date, id]);
            res.status(201).send(req.body);
        }
        catch (error) {
            next(error);
        }
    }))();
});
exports.default = router;
