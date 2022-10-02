import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
  serviceTags: [String],
  profilePic: String,
  rating: { Number, default: 0 },
  profileDescription: String,
  brandName: String,
  field: String,
});

export default mongoose.model("User", userSchema);
