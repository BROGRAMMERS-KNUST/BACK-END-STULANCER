import hirer from "../models/hirer.js";
import serviceprovider from "../models/serviceprovider.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const forgotpassword = async (req, res) => {
  try {
    const { email, serviceType } = req.body;
    console.log(`email: ${email}..... accountType: ${serviceType} `);
    if (serviceType === "Hirer") {
      const existingUser = await hirer.findOne({ email });
      console.log(existingUser);
    }
    if (serviceType === "Stulancer") {
      const existingUser = await serviceprovider.findOne({ email });
      console.log(existingUser);
    }

    //MAKING SURE USER EXISTS IN DATABASE
    if (!existingUser) {
      res.send("User email does not exist");
    }

    //USER EXIST .... CREATING ONE TIME LINK FOR USER
    const JWT_SECRET = process.env.JWT_SECRET;
    const secret = `JWT_SECRET${existingUser.password}`;
    const payload = { id: existingUser.id, eemail: existingUser.email };
    const token = Jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `https://localhost/reset-password/${id}/${token}.`;
    console.log("Password link has been sent to your email");

    res.send(link);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

export const resetpassword = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
