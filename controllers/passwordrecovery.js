import hirer from "../models/hirer.js";
import serviceprovider from "../models/serviceprovider.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const forgotpassword = async (req, res) => {
  let existingUser = null;
  try {
    const { email, serviceType } = await req.body;
    console.log(`email: ${email}..... accountType: ${serviceType} `);
    if (serviceType === "Hirer") {
      existingUser = await hirer.findOne({ email });
    }
    if (serviceType === "Stulancer") {
      existingUser = await serviceprovider.findOne({ email });
    }

    //MAKING SURE USER EXISTS IN DATABASE

    if (existingUser == null) {
      return res.status(404).send({ msg: "User email does not exist" });
    }

    // USER EXIST .... CREATING ONE TIME LINK FOR USER
    const JWT_SECRET = process.env.JWT_SECRET;

    const secret = `JWT_SECRET${existingUser.password}`;

    // MAKING SURE USER EXISTS IN DATABASE
    if (existingUser == null) {
      res.status(404).json({ message: "User email does not exist" });
      console.log("user does not exist");
    }

    // USER EXISTS .... CREATING ONE TIME LINK FOR USER
    const payload = { id: existingUser.id, email: existingUser.email };

    const token = Jwt.sign(payload, secret, { expiresIn: "15m" });

    const link = `http://localhost/reset-password/${payload.id}/${token}`;
    console.log(link);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const resetpassword = async (req, res) => {
  const { id, token } = await req.params;
  console.log(req.params);
  res.status(200).json(req.params);
};
