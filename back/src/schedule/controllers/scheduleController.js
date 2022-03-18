import {
  getSchedule,
  deleteSchedule,
  getAllSchedule,
  getScheduleByPatient,
  newSchedule,
  updateSchedule,
} from "../repositories/scheduleRepository.js";

export async function getAllScheduleController(req, res, next) {
  const schedule = await getAllSchedule();
  res.json(schedule);
}

export async function newScheduleController(req, res, next) {
  const { patient, dateAppointment, appointment, specialty, status } = req.body;

  if (!patient)
    return res.status(400).json("Parametro PACIENTE ID não foi informado");
  if (!dateAppointment)
    return res.status(400).json("Parametro DATA AGENDAMENTO não foi informado");
  if (!appointment)
    return res.status(400).json("Parametro HORARIO não foi informado");
  if (!specialty)
    return res.status(400).json("Parametro ESPECIALIDADE não foi informado");
  if (!status)
    return res.status(400).json("Parametro STATUS não foi informado");

  const agenda = await newSchedule({
    patient,
    dateAppointment,
    appointment,
    specialty,
    status,
  });

  return res.status(200).json(agenda);
}

export async function deleteScheduleController(req, res, next) {
  const id = req.params.id;
  const schedule = await deleteSchedule(id);
  res.json(schedule);
}

export async function getScheduleController(req, res, next) {
  const id = req.params.id;
  const schedule = await getSchedule(id);
  res.json(schedule);
}

export async function getScheduleByPatientController(req, res, next) {
  const id = req.params.id;
  const schedule = await getScheduleByPatient(id);
  res.json(schedule);
}

export async function updateScheduleController(req, res, next) {
  const { patient, dateAppointment, appointment, specialty, status } = req.body;
  const id = req.params.id;

  const schedule = await updateSchedule(id, {
    patient,
    dateAppointment,
    appointment,
    specialty,
    status,
  });

  return res.status(200).json(schedule);
}
