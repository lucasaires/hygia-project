import ScheduleModal from "../models/scheduleModel.js";
import pkg from "mongoose";

const { Types } = pkg;

export async function newSchedule(dados) {
  return await ScheduleModal.create(dados);
}

export async function updateSchedule(id, data) {
  let schedule = {};

  if (Types.ObjectId.isValid(id)) {
    schedule = await ScheduleModal.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  return schedule;
}

export async function getAllSchedule() {
  return await ScheduleModal.find().populate("patient");
}

export async function getSchedule(id) {
  const schedule = await ScheduleModal.findById(id).populate("patient");
  return schedule;
}

export async function getScheduleByPatient(id) {
  const schedule = await ScheduleModal.find({ paciente: id }).populate(
    "paciente"
  );
  return schedule;
}

export async function deleteSchedule(id) {
  return await ScheduleModal.findByIdAndRemove(id);
}
