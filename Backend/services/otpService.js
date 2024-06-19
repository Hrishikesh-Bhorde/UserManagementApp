
import crypto from "crypto";
import nodemailer from "nodemailer"
import Otp from "../models/otp.model.js"
import User from "../models/user.model.js"

export const generateOtp = async (userId) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
  const expiresAt = new Date(Date.now() + 5 * 60000); // OTP expires in 5 minutes

  await Otp.create({ userId, otp, expiresAt });

  // Send OTP via email
  const user = await User.findById(userId);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'hehehejadugar@gmail.com',
      pass: 'jvih voia lwey xlgx',
    },
  });

  const mailOptions = {
    from: 'hehehejadugar@gmail.com',
    to: user.email,
    subject: 'Your OTP Code',
    text: `Your OTP for email verification is ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);

  return otp;
};

export const verifyOtp = async (userId, providedOtp) => {
  const otpRecord = await Otp.findOne({ userId, otp: providedOtp });

  if (!otpRecord) {
    throw new Error('Invalid or expired OTP');
  }

  if (otpRecord.expiresAt < new Date()) {
    await Otp.deleteOne({ _id: otpRecord._id }); // Delete expired OTP
    throw new Error('OTP has expired');
  }

  await Otp.deleteOne({ _id: otpRecord._id }); // OTP is valid, delete it after use

  // OTP is valid, perform user sign-in or token generation here
  // For example, generate a JWT token for the user

  return true; // Indicate successful OTP verification
};

// module.exports = {
//   generateOtp,
//   verifyOtp,
// };
