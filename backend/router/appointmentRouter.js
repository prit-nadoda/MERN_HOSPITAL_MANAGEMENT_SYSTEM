import express from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
import {
  GetMyAppointments,
  deleteAppointment,
  getAllAppointments,
  makeApoointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/make", isPatientAuthenticated, makeApoointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
router.delete(
  "/myAppointment/delete/:id",
  isPatientAuthenticated,
  deleteAppointment
);
router.get("/myAppointments", isPatientAuthenticated, GetMyAppointments);

export default router;
