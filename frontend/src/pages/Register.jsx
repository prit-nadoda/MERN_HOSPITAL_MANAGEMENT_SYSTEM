import React, { useContext, useState } from "react";
import { Context } from "../main.jsx";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const navigateTo = useNavigate();

  const HandleRegister = async (e) => {
    e.preventDefault();
    // https://backend-hms-deployed.onrender.com/api/v1/user/patient/register
    try {
      await axios
        .post(
          "https://backend-hms-deployed.onrender.com/api/v1/user/patient/register",
          {
            firstname,
            lastname,
            email,
            number,
            password,
            gender,
            age,
            type: "Patient",
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please Sign In to continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est quia in
        nemo eveniet distinctio?
      </p>
      <form onSubmit={HandleRegister}>
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
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div
          style={{
            gap: "10px",
            alignContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link to={"/login"} style={{ alignContent: "center" }}>
            Login Now
          </Link>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
