import hirer from '../models/hirer.js';
import serviceprovider from '../models/serviceprovider.js';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
const keysecret = process.env.JWT_SECRET;
export const forgotpassword = async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: 'Enter Your Email' });
  }

  try {
    const userfind = await serviceprovider.findOne({ email: email });

    // token generate for reset password
    const token = Jwt.sign({ _id: userfind._id }, keysecret, {
      expiresIn: '3m',
    });

    const setusertoken = await serviceprovider.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );

    if (setusertoken) {
      return res.status(200).json({
        result: setusertoken,
        link: `This Link Valid For 3 MINUTES http://localhost:3000/reset-password/${userfind.id}/${setusertoken.verifytoken}`,
        message: ' A password reset link has been sent',
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: 'Invalid User !' });
  }
};

export const resetpassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(id);
  console.log(token);
  const { password } = req.body;
  console.log(`Password at backend ${password}`);
  try {
    const validuser = await serviceprovider.findOne({
      _id: id,
      verifytoken: token,
    });
    console.log(`valid user ${validuser}`);
    const verifyToken = Jwt.verify(token, keysecret);
    console.log(`verify token ${verifyToken._id}`);

    console.log(`Valid user ${validuser._id}`);
    console.log(validuser._id && verifyToken._id ? true : false);

    if (validuser._id && verifyToken._id ? true : false) {
      const newpassword = await bcrypt.hash(password, 12);
      console.log(`new password ${newpassword}`);
      const setnewuserpass = await serviceprovider.findByIdAndUpdate(
        { _id: id },
        { password: newpassword },
        {
          new: true,
          runValidators: true,
        }
      );

      res
        .status(201)
        .json({ status: 201, message: 'Password Reset Successful !' });
    } else {
      res.status(401).json({ status: 401, message: 'User not Exist !' });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: 'Something went wrong !' });
  }
};
