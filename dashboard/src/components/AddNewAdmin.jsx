import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const HandleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://backend-hms-deployed.onrender.com/api/v1/user/admin/addNewAdmin",
          {
            firstname,
            lastname,
            email,
            number,
            password,
            gender,
            age,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
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
        <div className="container form-component add-admin-form">
          <img src="/logo.png" alt="logo" className="logo" />
          <h1 className="form-title">Add a New Admin</h1>

          <form onSubmit={HandleAddNewAdmin}>
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
            </div>

            <div
              style={{
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <button type="submit">Add Admin</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewAdmin;
