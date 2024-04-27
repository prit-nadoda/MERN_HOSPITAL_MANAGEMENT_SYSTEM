import React from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <footer className="container ">
      <hr />
      <div className="content">
        <div>
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div>
          <h4>Navigations</h4>
          <ul>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/appointment"}>Appointment</Link>
          </ul>
        </div>
        <div>
          <h4>Hours</h4>
          {hours.map((elem) => {
            return (
              <li key={elem.id}>
                <span>{elem.day}</span>
                <span>{elem.time}</span>
              </li>
            );
          })}
        </div>
        <div>
          <h4>Contact US</h4>
          <div>
            <FaPhone />
            <span>+91 9865768743</span>
          </div>
          <div>
            <MdEmail />
            <span>prit.nadoda.123@gmail.com</span>
          </div>
          <div>
            <FaLocationArrow />
            <span>1x2 - Afd. ahgskjhb, sdbjs hvnufsdsd -395867</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
