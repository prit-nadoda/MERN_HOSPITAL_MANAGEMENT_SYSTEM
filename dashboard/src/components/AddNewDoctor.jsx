import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [doctorDepartment, setDocterDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState();
  const [docAvatarPeview, setDocAvatarPeview] = useState();

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

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatar(file);
      setDocAvatarPeview(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  const HandleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      console.log(formData);
      const response = await axios
        .post(
          "https://backend-hms-deployed.onrender.com/api/v1/user/admin/addNewDoctor",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setAge("");
          setEmail("");
          setFirstname("");
          setGender("");
          setLastname("");
          setNumber("");
          setPassword("");
          setDocAvatar("");
          setDocAvatarPeview("");
          setDocterDepartment("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="page">
        <div className="container form-component add-doctor-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">Add a New Doctor</h1>

          <form onSubmit={HandleAddNewDoctor}>
            <div className="first-wrapper">
              <div className="doc-img">
                <img
                  src={
                    docAvatarPeview ? `${docAvatarPeview}` : "/docHolder.jpg"
                  }
                  alt="Avatar Preview"
                />

                <input type="file" onChange={handleAvatar} />
              </div>
            </div>
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <select
                value={doctorDepartment}
                onChange={(e) => setDocterDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div
              style={{
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <button type="submit">Add Doctor</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewDoctor;
