import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-hms-deployed.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.log("ERROR WHILE FETCHING APPOINTMENTS :", error);
      }
    };
    getAppointments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-hms-deployed.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.log("ERROR WHILE FETCHING DOCTORS :", error);
      }
    };
    fetchDoctors();
  }, []);

  const HandleUpdateStatus = async (appointmentID, status) => {
    try {
      const { data } = await axios.put(
        `https://backend-hms-deployed.onrender.com/api/v1/appointment/update/${appointmentID}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((preAppointments) =>
        preAppointments.map((appointment) =>
          appointment._id === appointmentID
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
    return <Navigate to="/login" />;
  }
  return (
    <>
      <section className="page dashboard">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <h5>{user && `Welcome, ${user.firstname} ${user.lastname}`}</h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments && appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors && doctors.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table className="table-app">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
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
                        onChange={(e) =>
                          HandleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option className="value-pending" value="Pending">
                          Pending
                        </option>
                        <option className="value-accepted" value="Confirmed">
                          Confirmed
                        </option>
                        <option className="value-rejected" value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
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
                <h1>No Appointments</h1>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
