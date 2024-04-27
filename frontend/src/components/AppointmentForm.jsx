import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main.jsx";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { FaTrash } from "react-icons/fa";

const AppointmentForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [appointment_date, setappointment_date] = useState("");
  const [appointment_time, setappointment_time] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor_fname, setDoctorFname] = useState("");
  const [doctor_lname, setDoctorLname] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const { isAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctor] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://backend-hms-deployed.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctor(data.doctors);
    };
    fetchDoctors();
  }, []);

  const HandleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://backend-hms-deployed.onrender.com/api/v1/appointment/make",
        {
          firstname,
          lastname,
          email,
          number,
          age,
          gender,
          appointment_date,
          appointment_time,
          department,
          doctor_fname,
          doctor_lname,
          hasVisited,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthenticated) {
    toast.error("You are Not Authenticated!");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Make an Appointment</h2>
        <p>Fill the form and Schedule your Appointment</p>

        <form onSubmit={HandleAppointment}>
          <div>
            <input
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <select
              value={appointment_time}
              onChange={(e) => setappointment_time(e.target.value)}
            >
              <option value="">Select Time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointment_date}
              onChange={(e) => setappointment_date(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFname("");
                setDoctorLname("");
              }}
            >
              {departmentsArray.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <select
              value={`${doctor_fname} ${doctor_lname}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFname(firstName);
                setDoctorLname(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => {
                  return (
                    <option
                      key={index}
                      value={`${doctor.firstname} ${doctor.lastname}`}
                    >
                      {`${doctor.firstname} ${doctor.lastname}`}
                    </option>
                  );
                })}
            </select>
          </div>

          <div
            style={{
              gap: "10px",
              alignContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <div
            style={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <button type="submit">Get Appointment</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
