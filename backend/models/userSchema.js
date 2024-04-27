import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: [true, "Age is required!"],
    maxlength: [125, "Please enter a valid lenght!"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required!"],
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [8, "Password must consist at least 8 characters!"],
    select: false,
  },
  type: {
    type: String,
    enum: ["Patient", "Admin", "Doctor"],
    default: "User",
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("users", userSchema);
