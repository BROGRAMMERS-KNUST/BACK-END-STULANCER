import Jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

//SIGN UP CONTROLLER

export const signup = async (req, res) => {
  const { fullName, email, password, serviceType } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: 'Email already exists' });

    //ENCRYPTING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    //CREATING USER DATA/PROFILE
    const data = {
      fullName: fullName,
      email: email,
      username: username,
      password: hashedPassword,
      serviceType: serviceType,
    };
    const result = await User.create(data);

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        name: result.name,
        email: result.email,
        password: result.password,
        serviceType: result.serviceType,
        id: result._id,
      },
      'test',
      { expiresIn: '1hr' }
    );

    //SENDING RESPONSE
    res.status(200).json({ result, token });
    console.log(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//LOGIN CONTROLLER

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: 'Email does not exist' });

    // //VERIFYING LOGIN PASSWORD
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: 'Invalid credentials' });

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      'test'
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
