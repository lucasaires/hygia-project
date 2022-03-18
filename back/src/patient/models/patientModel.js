import pkg from "mongoose";

const { Schema, model } = pkg;

const PatientModel = new Schema({
  name: {
    type: String,
    require: true,
  },

  birthday: {
    type: String,
    require: true,
  },
  street: {
    type: String,
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  uf: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Patient", PatientModel);
