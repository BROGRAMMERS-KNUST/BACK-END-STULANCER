import serviceprovider from '../models/serviceprovider.js';

export const getProfiles = async (req, res) => {
  try {
    const { id } = req.params;

    const stulancers = await serviceprovider.find({ service: id });
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
    console.log(error.response.data);
  }
};
