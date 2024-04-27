import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required!"],
    minlength: [2, "Firstame must consist 2 characters!"],
  },
  lastname: {
    type: String,
    required: [true, "Firstname is required!"],
    minlength: [2, "Lastname must consist 2 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  number: {
    type: String,
    required: [true, "Number is required!"],
    minlength: [10, "Number must consist exactly 10 characters!"],
    maxlength: [10, "Number must consist exactly 10 characters!"],
  },
  message: {
    type: String,
    required: [true, "Message is required!"],
    minlength: [10, "Message must consist at least 10 characters!"],
  },
});

export const Message = mongoose.model("messages", messageSchema);
