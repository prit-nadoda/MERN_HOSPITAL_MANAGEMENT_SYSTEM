import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
          { email, password, conformPassword, type: "Admin" },
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
      <img src="/logo.png" alt="logo" className="logo" />
      <h1 className="form-title">Sign In As an Admin</h1>
      <p>Only Admins Are Allowed To Access These Resources</p>
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
