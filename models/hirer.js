import mongoose from 'mongoose';

const hirerSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  serviceType: { type: String, required: true },
  profilePic: String,
});

export default mongoose.model('Hirer', hirerSchema);
