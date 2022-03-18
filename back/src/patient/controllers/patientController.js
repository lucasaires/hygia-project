import {
  newPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
} from "../repositories/patientRepository.js";

export async function getPatientController(req, res, next) {
  const id = req.params.id;
  const patient = await getPatient(id);
  res.json(patient);
}

export async function getPatientsController(req, res, next) {
  const patients = await getPatients();
  res.json(patients);
}

export async function newPacienteController(req, res, next) {
  const { name, birthday, street, adress, city, uf, phone, email, gender } =
    req.body;

  if (!name) return res.status(400).json("Erro: nome não informado");
  if (!birthday)
    return res.status(400).json("Erro: data de nascimento não informada");
  if (!gender) return res.status(400).json("Error sexo não informado");

  const patient = await newPatient({
    name,
    birthday,
    street,
    adress,
    city,
    uf,
    phone,
    email,
    gender,
  });

  return res.status(200).json(patient);
}

export async function updatePatientController(req, res, next) {
  const { name, birthday, street, adress, city, uf, phone, email, gender } =
    req.body;

  const id = req.params.id;

  const patient = await updatePatient(id, {
    name,
    birthday,
    street,
    adress,
    city,
    uf,
    phone,
    email,
    gender,
  });

  return res.status(200).json(patient);
}

export async function deletePatientController(req, res, next) {
  const id = req.params.id;
  const patient = await deletePatient(id);
  res.json(patient);
}
