import PostMessage from "../models/postMessage.js";
import user from "../models/user.js";

export const getAllPosts = async (req, res) => {
  try {
    const stulancers = await user.find({ serviceType: "servicer" });
    res.status(200).json({ stulancers });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
export const createPost = async (req, res) => {
  const newPost = await PostMessage.create(req.body);
  console.log(newPost);
  try {
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
  }
};
