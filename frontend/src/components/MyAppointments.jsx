import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { GoCheckCircleFill } from "react-icons/go";
// import { AiFillCloseCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const MyAppointments = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-hms-deployed.onrender.com/api/v1/appointment/myAppointments",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.log("ERROR WHILE FETCHING APPOINTMENTS :", error);
      }
    };
    getAppointments();
  }, []);

  const HandleDeleteAppointment = async (appointmentID) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(
          `https://backend-hms-deployed.onrender.com/api/v1/appointment/delete/${appointmentID}`,
          { withCredentials: true }
        );
        setAppointments((preAppointments) =>
          preAppointments.filter(
            (appointment) => appointment._id !== appointmentID
          )
        );
        toast.success("Appointment deleted successfully!");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        toast.error("Failed to delete appointment!");
      }
    }
  };

  if (!isAuthenticated) {
    toast.error("You are Not Authenticated!");
    return <Navigate to="/login" />;
  }
  return (
    <>
      <section className="appointment-page dashboard">
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstname} ${appointment.lastname}`}</td>
                    <td>
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>{appointment.appointment_time}</td>
                    <td>{`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Cancelled"
                            ? "value-rejected"
                            : "value-accepted"
                        }
                        value={appointment.status}
                        disabled={true}
                      >
                        <option className="" value="">
                          {appointment.status}
                        </option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => HandleDeleteAppointment(appointment._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <h3>No Appointments</h3>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default MyAppointments;
