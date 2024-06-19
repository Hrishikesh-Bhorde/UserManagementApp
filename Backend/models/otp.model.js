import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // Automatically delete OTPs after 5 minutes

const Otp = mongoose.model('otp', otpSchema);

export default Otp;
