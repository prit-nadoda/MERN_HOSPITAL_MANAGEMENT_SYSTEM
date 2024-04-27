import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoLogOut } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const goToDashboard = () => {
    navigateTo("/");
    setShow(false);
  };

  const goToAddAdmin = () => {
    navigateTo("admin/addNew");
    setShow(false);
  };
  const goToAddDoctor = () => {
    navigateTo("doctor/addNew");
    setShow(false);
  };
  const goToMessages = () => {
    navigateTo("/messages");
    setShow(false);
  };
  const goToDoctor = () => {
    navigateTo("/doctors");
    setShow(false);
  };
  const goToLogin = () => {
    navigateTo("/login");
    setShow(!show);
  };

  const HandleLogout = async () => {
    await axios
      .get(
        "https://backend-hms-deployed.onrender.com/api/v1/user/admin/logout",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const gotoLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <GoHomeFill onClick={goToDashboard} />
          <MdAddModerator onClick={goToAddAdmin} />
          <IoPersonAddSharp onClick={goToAddDoctor} />
          <FaUserDoctor onClick={goToDoctor} />
          <RiMessage2Fill onClick={goToMessages} />
          <IoLogOut onClick={HandleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
