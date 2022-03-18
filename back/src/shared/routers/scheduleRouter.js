import { Router } from "express";
import {
  getScheduleController,
  updateScheduleController,
  getAllScheduleController,
  getScheduleByPatientController,
  newScheduleController,
  deleteScheduleController,
} from "../../schedule/controllers/scheduleController.js";

const router = Router();

router.get("/:id", getScheduleController);

router.put("/:id", updateScheduleController);

router.get("/", getAllScheduleController);

router.get("/patient/:id", getScheduleByPatientController);

router.post("/", newScheduleController);

router.delete("/:id", deleteScheduleController);

export default router;
