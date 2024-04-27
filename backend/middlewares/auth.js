import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware.js";

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return next(new ErrorHandler("Admin is not Authenticated", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decode._id);
  if (req.user.type !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.type} not authorized to access this resource!!`,
        403
      )
    );
  }
  next();
});

export const isPatientAuthenticated = catchAsyncError(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("Petient is not Authenticated", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode._id);
    if (req.user.type !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.type} not authorized to access this resource!!`,
          403
        )
      );
    }
    next();
  }
);
