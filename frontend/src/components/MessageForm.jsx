import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const HandleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://backend-hms-deployed.onrender.com/api/v1/message/send",
          { firstname, lastname, email, number, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstname("");
          setLastname("");
          setEmail("");
          setNumber("");
          setMessage("");
          return;
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="container form-component message-form">
      <h2>Send Us a Message</h2>
      <form onSubmit={HandleMessage}>
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
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <textarea
          rows="7"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
