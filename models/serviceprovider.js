import mongoose from 'mongoose';

const serviceproviderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
  serviceTags: [String],
  rating: { Number, default: 0 },
  field: String,
  bio: String,
  portfolioLink: String,
  telephoneNumber: Number,
  whatsappLink: String,
  service: String,
  profilePic: String,
});

export default mongoose.model('ServiceProvider', serviceproviderSchema);
