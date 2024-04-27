import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { Appointment } from "../models/appointmentSchema.js";

export const makeApoointment = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    number,
    age,
    gender,
    appointment_date,
    department,
    doctor_fname,
    doctor_lname,
    hasVisited,
    appointment_time,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !number ||
    !age ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_fname ||
    !doctor_lname ||
    !appointment_time
  ) {
    return next(new ErrorHandler("Please fill the required fields!", 400));
  }

  const isConflict = await User.find({
    firstname: doctor_fname,
    lastname: doctor_lname,
    type: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found!", 400));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctor conflict! please contact through Email or Phone!",
        400
      )
    );
  }

  const isMaxAppointment = await Appointment.find({
    appointment_date: appointment_date,
    appointment_time: appointment_time,
  });

  if (isMaxAppointment.length >= 24) {
    return next(
      new ErrorHandler(
        "Appointment time is booked! Please choose a different time range!",
        400
      )
    );
  }

  const doctorID = isConflict[0]._id;
  const patientID = req.user._id;

  const appointment = await Appointment.create({
    firstname,
    lastname,
    email,
    number,
    age,
    gender,
    appointment_date,
    department,
    doctor: {
      firstname: doctor_fname,
      lastname: doctor_lname,
    },
    doctor_lname,
    hasVisited,
    appointment_time,
    doctorID,
    patientID,
  });

  res.status(200).json({
    success: true,
    message: "Appointment sent successfully!",
  });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 400));
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully!",
      appointment: updatedAppointment,
    });
  }
);

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 400));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment deleted successfully!",
  });
});

export const GetMyAppointments = catchAsyncError(async (req, res, next) => {
  const appointments = await Appointment.find({
    patientID: req.user._id,
  });

  appointments && appointments.length > 0
    ? res.status(200).json({
        success: true,
        appointments,
      })
    : res.status(200).json({
        success: true,
        message: "No appointments found!",
      });
});

export const deleteMyAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await Appointment.findById({
    _id: id,
    patientID: req.user._sid,
  });

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }

  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment deleted successfully!",
  });
});
