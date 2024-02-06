import express = require("express");
import { Request, Response, NextFunction, RequestHandler } from "express";

const router = express();

import db from "../db";
import { UserObject } from "../types";
import { isString } from "../services/service";

/* Request all users from DB */
router.get("/", (_req: Request, res: Response, next: NextFunction) => {
  void (async () => {
    try {
      const result: unknown = await db.query("SELECT * FROM users");

      /* Narrowing received object from server */
      if (
        !result ||
        typeof result !== "object" ||
        !("rowCount" in result) ||
        !("rows" in result) ||
        !Array.isArray(result.rows)
      ) {
        throw Error("received invalid user object from server");
      }

      res.status(200).send(result.rows);
    } catch (error) {
      next(error);
    }
  })();
});

/* Request one user by ID from DB */
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  void (async () => {
    try {
      const result: unknown = await db.query(
        `SELECT * FROM users WHERE id = $1`,
        [req.params.id]
      );

      /* Narrowing received object from server */
      if (
        !result ||
        typeof result !== "object" ||
        !("rowCount" in result) ||
        !("rows" in result) ||
        !Array.isArray(result.rows)
      ) {
        throw Error("received invalid user object from server");
      }

      /* If user not found throwing error to error handler middleware */
      if (!result.rowCount) {
        throw Error(`user with ID ${req.params.id} not found in DB`);
      }

      res.send(result.rows[0]);
    } catch (error) {
      next(error);
    }
  })();
});

/* Adding new user to users DB */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  // const { username, fullname, password }: UserObject = req.body as UserObject;

  const obj: unknown = req.body;
  void (async () => {
    try {
      /* Narrowing username, password and fullname.
       * fullname must exist in req.body
       */
      if (
        !obj ||
        typeof obj !== "object" ||
        !("username" in obj) ||
        !("password" in obj) ||
        !("fullname" in obj) ||
        !isString(obj.username) ||
        !isString(obj.password) ||
        !isString(obj.fullname)
      ) {
        throw Error(
          "corrupted data or some field absent in job object received from server"
        );
      }
      const { username, password, fullname } = obj;

      await db.query(
        `INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3)`,
        [username, password, fullname]
      );

      res.status(201).send(req.body);
    } catch (error) {
      next(error);
    }
  })();
});

/* Deleting user by ID */
router.delete("/:id", (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.query(`DELETE FROM users WHERE id = $1`, [req.params.id]);

    /* Sending No Content if success*/
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

/* Adding new user to users DB */
router.put("/:id", (async (req: Request, res: Response, next: NextFunction) => {
  const { username, fullname, password }: UserObject = req.body as UserObject;
  const user_id = req.params.id;

  try {
    await db.query(
      `UPDATE users
                SET username = $1, password = $2, fullname = $3
                WHERE id = $4`,
      [username, password, fullname, user_id]
    );

    res.status(201).send(req.body);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
