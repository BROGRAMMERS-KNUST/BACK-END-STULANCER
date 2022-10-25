import mongoose from 'mongoose';

const serviceproviderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
  rating: { Number, default: 0 },
  field: String,
  bio: String,
  portfolioLink: String,
  telephoneNumber: Number,
  whatsappLink: String,
  service: String,
  specificService: String,
  profilePic: String,
  startingPrice: Number,
  brandPic1: String,
  brandPic2: String,
  brandPic3: String,
  verifytoken: String,
});

export default mongoose.model('ServiceProvider', serviceproviderSchema);
