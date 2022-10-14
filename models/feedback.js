import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
});

export default mongoose.model('Feedback', feedbackSchema);
