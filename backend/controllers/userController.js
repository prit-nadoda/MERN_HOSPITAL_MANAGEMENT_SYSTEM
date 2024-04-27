import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwkToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    number,
    age,
    gender,
    password,
    type,
    // doctorDepartment,
    // docAvatar,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !number ||
    !age ||
    !gender ||
    !password ||
    !type
  ) {
    return next(new ErrorHandler("Please fill all the fields!", 400));
  }

  let isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return next(
      new ErrorHandler(
        "User already Registrated with given Email Address!",
        400
      )
    );
  }

  const user = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    number: number,
    age: age,
    gender: gender,
    password: password,
    type: type,
    // doctorDepartment: doctorDepartment,
    // docAvatar: docAvatar,
  });
  generateToken(user, "patient registered successfully!", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, conformPassword, type } = req.body;
  if (!email || !password || !conformPassword || !type) {
    return next(new ErrorHandler("Please provide full information!!", 400));
  }
  if (!conformPassword === password) {
    return next(new ErrorHandler("Passwords do not macth!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  if (type !== user.type) {
    return next(new ErrorHandler("You are not authorized for this Role", 400));
  }
  generateToken(user, "You are logged in successfully!", 200, res);
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, number, age, gender, password } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !number ||
    !age ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please provide full information!", 400));
  }
  const isAlreadyExist = await User.findOne({ email });
  if (isAlreadyExist) {
    return next(
      new ErrorHandler(
        `${isAlreadyExist.type} with this email already registered!`,
        400
      )
    );
  }

  const Admin = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    number: number,
    age: age,
    gender: gender,
    password: password,
    type: "Admin",
  });
  Admin
    ? res
        .status(200)
        .json({ success: true, message: "Admin Added Successfully!" })
    : res
        .status(400)
        .json({ success: false, message: "Failed to add new Admin!" });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ type: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserInfo = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Admin logged out successfully!",
    });
});
export const logoutPatient = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Patient logged out successfully!",
    });
});

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files) === 0) {
    return next(new ErrorHandler("Doctor Avatar is missig!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/jpg", "image/jpeg", "image/webp", "image/png"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("This file format is not supported!", 400));
  }
  const {
    firstname,
    lastname,
    email,
    number,
    age,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !number ||
    !age ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please provide full information!", 400));
  }
  const isAlreadyExist = await User.findOne({ email });
  if (isAlreadyExist) {
    return next(
      new ErrorHandler(
        `${isAlreadyExist.type} is already registrated with given Email!`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      `Cloudinary Error : ${
        cloudinaryResponse.error.message || "Unknown Cloudinary Error"
      }`
    );
  }
  const doctor = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    number: number,
    age: age,
    gender: gender,
    password: password,
    type: "Doctor",
    doctorDepartment: doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  doctor
    ? res
        .status(200)
        .json({ success: true, message: "Doctor Added Successfully!", doctor })
    : res
        .status(400)
        .json({ success: false, message: "Something Went wrong!" });
});
