import express = require("express");
import { Request, Response, NextFunction } from "express";
const router = express();

import db from "../db";
import { JobObject } from "../types";

/* Request all jobs for user by user ID */
router.get("/jobs/:id", (req: Request, res: Response, next: NextFunction) => {
  void (async () => {
    try {
      const result = await db.query(
        `SELECT job_title, job_desc, date_of_apply, current_status_desc, active
                FROM jobs_data WHERE user_id = $1 ORDER BY "date_of_apply" DESC`,
        [req.params.id]
      );

      res.status(200).send(result.rows);
    } catch (error) {
      next(error);
    }
  })();
});

/* Request one job entity by job ID */
router.get("/job/:id", (req: Request, res: Response, next: NextFunction) => {
  void (async () => {
    try {
      const result = await db.query(
        `SELECT job_title, job_desc, date_of_apply, current_status_desc, active
                FROM jobs_data WHERE id = $1`,
        [req.params.id]
      );

      /* If user not found throwing error to error handler middleware */
      if (!result.rowCount)
        throw Error(`user with ID ${req.params.id} not found in DB`);

      res.send(result.rows[0]);
    } catch (error) {
      next(error);
    }
  })();
});

/* Adding new job */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  //TODO not safe
  const {
    job_title,
    job_desc,
    date_of_apply,
    current_status_desc,
    active,
  }: JobObject = req.body as JobObject;
  const user_id = req.params.id;

  void (async () => {
    try {
      await db.query(
        `INSERT INTO jobs_data (job_title, job_desc, date_of_apply,
                current_status_desc, active)
                VALUES ($1, $2, $3, $4, $5) WHERE id = $6`,
        [
          job_title,
          job_desc,
          date_of_apply,
          current_status_desc,
          active,
          user_id,
        ]
      );

      res.status(201).send(req.body);
    } catch (error) {
      next(error);
    }
  })();
});

/* Deleting job by ID */
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  void (async () => {
    try {
      await db.query(`DELETE FROM jobs_data WHERE id = $1`, [req.params.id]);

      /* Sending No Content if success*/
      res.status(204);
    } catch (error) {
      next(error);
    }
  })();
});

/* Changing one job*/
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  const {
    job_title,
    job_desc,
    date_of_apply,
    current_status_desc,
    active,
  }: JobObject = req.body as JobObject;
  const user_id = req.params.id;

  void (async () => {
    try {
      await db.query(
        `UPDATE jobs_data
                SET job_title = $1, job_desc = $2, date_of_apply = $3,
                    current_status_desc = $4, active = $5
                WHERE id = $6`,
        [
          job_title,
          job_desc,
          date_of_apply,
          current_status_desc,
          active,
          user_id,
        ]
      );

      res.status(201).send(req.body);
    } catch (error) {
      next(error);
    }
  })();
});

export default router;
