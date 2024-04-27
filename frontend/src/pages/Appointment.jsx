import React, { createContext, useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";
import MyAppointments from "../components/MyAppointments";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | VvCare"}
        imageUrl={"/signin.png"}
      />

      <AppointmentForm />
      <MyAppointments />
    </>
  );
};

export default Appointment;
