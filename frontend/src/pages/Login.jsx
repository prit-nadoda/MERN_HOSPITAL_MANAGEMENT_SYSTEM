import React, { useContext, useState } from "react";
import { Context } from "../main.jsx";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const navigateTo = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "https://backend-hms-deployed.onrender.com/api/v1/user/login",
          { email, password, conformPassword, type: "Patient" },
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
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login to Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est quia in
        nemo eveniet distinctio?
      </p>
      <form onSubmit={HandleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={conformPassword}
          onChange={(e) => setConformPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <div
          style={{
            gap: "10px",
            alignContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link to={"/register"} style={{ alignContent: "center" }}>
            Register Now
          </Link>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
