import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-hms-deployed.onrender.com/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log("ERROR WHILE FETCHING MESSAGES :", error);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page messages">
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => {
            return (
              <div className="card" key={index}>
                <div className="details">
                  <p>
                    First Name : <span>{message.firstname}</span>
                  </p>
                  <p>
                    Last Name : <span>{message.lastname}</span>
                  </p>
                  <p>
                    Email : <span>{message.email}</span>
                  </p>
                  <p>
                    Phone No. : <span>{message.number}</span>
                  </p>
                  <p>
                    Message : <span>{message.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages{console.log(messages)}</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
