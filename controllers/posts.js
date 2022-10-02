import user from "../models/user.js";

export const getProfiles = async (req, res) => {
  try {
    const { Data } = req.body;

    const stulancers = await user.find(Data);
    res.status(200).json({ stulancers });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
export const createProfile = async (req, res) => {
  const newPost = await PostMessage.create(req.body);
  try {
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
  }
};
