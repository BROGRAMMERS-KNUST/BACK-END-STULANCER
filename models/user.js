import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  studentId: String,
  serviceType: { type: String, required: true },
  serviceTags: [String],
  profilePic: String,
  rating: Number,
  profileDescription: String,
  brandName: String,
  field: String,
});

export default mongoose.model('User', userSchema);
