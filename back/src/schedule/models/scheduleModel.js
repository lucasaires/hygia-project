import pkg from "mongoose";

const { Schema, model } = pkg;

const ScheduleModal = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    require: true,
    foreignField: "_id",
  },

  dateAppointment: {
    type: String,
    require: true,
  },
  appointment: {
    type: String,
    require: true,
  },
  specialty: {
    type: String,
    require: true,
  },
  status: {
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

export default model("Schedule", ScheduleModal);
