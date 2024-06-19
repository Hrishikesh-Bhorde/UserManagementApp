import mongoose from "mongoose";

const userProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  profilePicture: { type: String },
  website: { type: String },
  location: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

userProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
