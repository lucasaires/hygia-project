import express, { json } from "express";

import cors from "cors";

import pkg from "mongoose";

import agendaRouter from "./shared/routers/scheduleRouter.js";
import pacienteRouter from "./shared/routers/patientRouter.js";

export const app = express();

app.use(cors());

app.use(json());

const { connect } = pkg;

connect(
  `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ezhcw.mongodb.net/test`
);

app.use("/schedule", agendaRouter);

app.use("/patient", pacienteRouter);

app.listen(process.env.PORT, () => {
  console.log("App is running at " + process.env.PORT);
});
