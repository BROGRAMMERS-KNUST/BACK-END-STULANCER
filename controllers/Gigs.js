import GigMessage from "../models/GigMessage";
import mongoose from "mongoose";
export const getGigs = async (req, res) => { 
  try {
      const GigMessages = await GigMessage.find();
              
      res.status(200).json(GigMessages);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}
export const createGig = async (req, res) => {
    const newGig = await GigMessage.create(req.body);
    try {
      await newGig.save();
      res.status(200).json(newGig);
    } catch (error) {
      console.log(error);
    }
  };