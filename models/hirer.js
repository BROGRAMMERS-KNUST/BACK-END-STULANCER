import mongoose from 'mongoose';

const hirerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
  profilePic: String,
});

export default mongoose.model('Hirer', hirerSchema);
