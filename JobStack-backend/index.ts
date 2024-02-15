import express, { Request, Response, NextFunction } from "express";
// import "dotenv/config";
const app = express();
import cors from "cors";

import usersRouter from "./controllers/users";
import jobsRouter from "./controllers/jobs";
import statusRouter from "./controllers/status";

app.use(cors());
app.use(express.json());

/* Setup routers */
app.use("/api/users", usersRouter);
app.use("/api/", jobsRouter);
app.use("/api/status/", statusRouter);

app.use(express.static('frontend'));

/* MIDLLEWARE: unknown endpoint handling */
const unknownEndpoint = (_req: Request, res: Response) => {
	res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

/* MIDLLEWARE: error handling */
const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
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
