import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

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

  if (!isAuthenticated) {
    toast.error("Admin Not Authenticated!");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <section className="page doctors">
        <h1>Doctors</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor, index) => {
              return (
                <div className="card">
                  <img src={doctor.docAvatar.url} alt="Doctor Avatar" />
                  <h4>{`${doctor.firstname} ${doctor.lastname}`}</h4>
                  <div className="details">
                    <p>
                      Department : <span>{doctor.doctorDepartment}</span>
                    </p>
                    <p>
                      Gender : <span>{doctor.gender}</span>
                    </p>
                    <p>
                      Email : <span>{doctor.email}</span>
                    </p>
                    <p>
                      Phone No. : <span>{doctor.number}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Registered Doctors Found</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
