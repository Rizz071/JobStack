import express = require("express");
import { Request, Response, NextFunction } from "express";
const router = express();

import db from "../db";
import { StatusObject } from "../types";

/* Request all job statuses for one job by id === job_id */
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    void (async () => {
        try {
            const result: unknown = await db.query(
                `SELECT id, position, status, status_desc, date
                FROM job_status WHERE job_id = $1 ORDER BY "position" ASC`,
                [req.params.id]
            );

            /* Narrowing received object from server */
            if (!result || typeof result !== "object" || !("rows" in result)) {
                throw Error(
                    "received invalid array of job statuses from server"
                );
            }

            res.status(200).send(result.rows);
        } catch (error) {
            next(error);
        }
    })();
});


/* Adding new status for one job by id === job_id */
router.post("/:id", (req: Request, res: Response, next: NextFunction) => {
    //TODO not safe
    const { position, status, status_desc, date }: StatusObject =
        req.body as StatusObject;


    const job_id = req.params.id;

    console.log(req.body);

    void (async () => {
        try {
            const result: unknown = await db.query(
                `INSERT INTO job_status (job_id, position, status, status_desc, date)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
                [job_id, position, status, status_desc, date]
            );

            /* Narrowing received object from server */
            if (
                !result ||
                typeof result !== "object" ||
                !("rowCount" in result) ||
                !("rows" in result) ||
                !Array.isArray(result.rows)
            ) {
                throw new Error("received invalid status object from server");
            }

            res.status(201).send(result.rows[0]);
        } catch (error) {
            next(error);
        }
    })();
});

/* Deleting one job status by id === status_id */
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    void (async () => {
        try {
            await db.query(`DELETE CASCADE job_status WHERE id = $1`, [
                req.params.id,
            ]);

            /* Sending No Content if success*/
            // res.status(204).send("item deleted");
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    })();
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
router.put(":id", (req: Request, res: Response, next: NextFunction) => {
    const { position, status, status_desc, date }: StatusObject =
        req.body as StatusObject;
    const id = req.params.id;

    void (async () => {
        try {
            await db.query(
                `UPDATE job_status
                SET position = $1, status = $2, status_desc = $3, date = $4
                WHERE job_id = $5`,
                [position, status, status_desc, date, id]
            );

            res.status(201).send(req.body);
        } catch (error) {
            next(error);
        }
    })();
});

export default router;
