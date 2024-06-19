import express from 'express';
import { generateOtp, verifyOtp } from "../services/otpService.js";
import User from '../models/user.model.js';

const router = express.Router();

// Route to request OTP for login
router.post('/login-request-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    await generateOtp(user._id);

    res.send('OTP sent to your email');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to verify OTP for login
router.post('/login-verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    await verifyOtp(user._id, otp);

    res.status(200).send({"message" : "OTP Verified", user :user})
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Route to request OTP for Email Verification
router.post('/verify-request-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    await generateOtp(user._id);

    res.send('OTP sent to your email');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to verify OTP for email verification
router.post('/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    await verifyOtp(user._id, otp);

    user.verified = true;
    await user.save();

    res.status(200).send({"message" : "Email Verified", user :user})
  } catch (error) {
    res.status(400).send(error.message);
  }
});


export default router;
