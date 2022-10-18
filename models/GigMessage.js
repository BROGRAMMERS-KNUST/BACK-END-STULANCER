import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  creator : { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  Description: { type: String, required: true },
  serviceType: { type: String, required: true },
  GigPic: String,
});
export default mongoose.model('GigMessage', gigSchema);


