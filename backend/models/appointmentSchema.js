import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required!"],
    minlength: [2, "Firstame must consist 2 characters!"],
  },
  lastname: {
    type: String,
    required: [true, "Firstname is required!"],
    minlength: [2, "Lastname must consist 2 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  number: {
    type: String,
    required: [true, "Number is required!"],
    minlength: [10, "Number must consist exactly 10 characters!"],
    maxlength: [10, "Number must consist exactly 10 characters!"],
  },
  age: {
    type: Number,
    required: [true, "Age is required!"],
    maxlength: [125, "Please enter a valid lenght!"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required!"],
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: Date,
    required: [true, "Appointment date is required!"],
  },
  appointment_time: {
    type: String,
    required: [true, "Appointment time is required!"],
    enum: ["Morning", "Afternoon", "Evening", "Night"],
  },
  department: {
    type: String,
    required: [true, "Department is required!"],
  },
  doctor: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  doctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Doctor is required!"],
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export const Appointment = mongoose.model("appointments", appointmentSchema);
