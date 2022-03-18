import { Router } from "express";
import {
  getPatientController,
  deletePatientController,
  getPatientsController,
  updatePatientController,
  newPacienteController,
} from "../../patient/controllers/patientController.js";

const router = Router();

router.get("/:id", getPatientController);

router.delete("/:id", deletePatientController);

router.get("/", getPatientsController);

router.put("/:id", updatePatientController);

router.post("/", newPacienteController);

export default router;
