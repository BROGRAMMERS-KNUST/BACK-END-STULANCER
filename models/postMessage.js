import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  name: String,
  reference: Number,
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
