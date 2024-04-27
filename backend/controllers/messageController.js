import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstname, lastname, email, message, number } = req.body;
  if (!firstname || !lastname || !email || !message || !number) {
    return next(new ErrorHandler("Please fill all the fields!", 400));
  }
  await Message.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    message: message,
    number: number,
  }).then(() => {
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
