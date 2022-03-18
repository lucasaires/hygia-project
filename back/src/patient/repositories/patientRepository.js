import PatientModel from "../models/patientModel.js";
import pkg from "mongoose";

const { Types } = pkg;

export async function newPatient(newPatient) {
  return await PatientModel.create(newPatient);
}

export async function getPatient(id) {
  return await PatientModel.findById(id);
}
export async function updatePatient(id, newPatient) {
  let patient = {};

  if (Types.ObjectId.isValid(id)) {
    patient = await PatientModel.findByIdAndUpdate(id, newPatient, {
      new: true,
    });
  }

  return patient;
}

export async function getPatients() {
  return await PatientModel.find();
}

export async function deletePatient(id) {
  return await PatientModel.findByIdAndDelete(id);
}
