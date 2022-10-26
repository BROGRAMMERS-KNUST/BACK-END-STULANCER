import Jwt from 'jsonwebtoken';
import hirer from '../models/hirer.js';
import serviceprovider from '../models/serviceprovider.js';
import feedbackModel from '../models/feedback.js';
import bcrypt from 'bcrypt';

//SIGN UP CONTROLLER

export const signup = async (req, res) => {
  const { fullName, email, password, serviceType, profilePic } = req.body;

  try {
    //CHECKING IF USER EXISTS
    const existingUser = await hirer.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: 'Email already exists' });

    if (password.length < 6)
      return res
        .status(404)
        .json({ message: 'Password must be more than 6 characters' });
    //ENCRYPTING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    //CREATING USER DATA/PROFILE
    const data = {
      fullName: fullName,
      email: email,
      password: hashedPassword,
      serviceType: serviceType,
      profilePic: profilePic,
    };
    const result = await hirer.create(data);

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        name: result.name,
        email: result.email,
        password: result.password,
        serviceType: result.serviceType,
        profilePic: result.profilePic,
        id: result._id,
      },
      'test',
      { expiresIn: '1hr' }
    );

    //SENDING RESPONSE
    res.status(200).json({ result, message: 'Signed up successfully !' });
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//SERVICE PROVIDER CONTROLLER
export const signupserviceprovider = async (req, res) => {
  const {
    fullName,
    email,
    password,
    serviceType,
    bio,
    portfolioLink,
    telephoneNumber,
    whatsappLink,
    service,
    specificService,
    profilePic,
    verifytoken,
  } = req.body;

  try {
    //CHECKING IF USER EXISTS

    const existingUser = await serviceprovider.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: 'Email already exists ' });

    if (password.length < 6)
      return res
        .status(404)
        .json({ message: 'Password must be more than 6 characters' });
    //ENCRYPTING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    //CREATING USER DATA/PROFILE
    const data = {
      fullName: fullName,
      email: email,
      password: hashedPassword,
      serviceType: serviceType,
      bio: bio,
      portfolioLink: portfolioLink,
      telephoneNumber: telephoneNumber,
      whatsappLink: whatsappLink,
      service: service,
      specificService: specificService,
      profilePic: profilePic,
      verifytoken: verifytoken,
    };
    const result = await serviceprovider.create(data);

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        name: result.name,
        email: result.email,
        password: result.password,
        serviceType: result.serviceType,
        bio: result.bio,
        portfolioLink: result.portfolioLink,
        telephoneNumber: result.telephoneNumber,
        whatsappLink: result.whatsappLink,
        service: result.service,
        profilePic: result.profilePic,
        specificService: result.specificService,
        verifytoken: result.verifytoken,
        id: result._id,
      },
      'test',
      { expiresIn: '20s' }
    );

    //SENDING RESPONSE
    res
      .status(200)
      .json({ result, token, message: 'Signed up successfully !' });
    console.log(result);
    console.log(token);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};

//LOGIN CONTROLLER FOR HIRER

export const loginHirer = async (req, res) => {
  const { email, password } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await hirer.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: 'User does not exist' });

    // //VERIFYING LOGIN PASSWORD
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: 'Wrong Email/Password' });

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      'test'
    );

    res.status(200).json({
      result: existingUser,
      token,
      message: 'Logged In successfully !',
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//LOGIN CONTROLLER FOR SERVICE PROVIDER

export const loginServicer = async (req, res) => {
  const { email, password } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await serviceprovider.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: 'User does not exist' });

    // //VERIFYING LOGIN PASSWORD
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: 'Wrong Email/Password' });

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      'test',
      { expiresIn: '20s' }
    );
    res.status(200).json({
      result: existingUser,
      token,
      message: 'Logged In successfully !',
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//UPDATE SERVICE PROVIDER
export const updateserviceProvider = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await serviceprovider.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ result, message: 'Update Successful !' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//TAKE BIO ,TEL,AND LINKS FOR THE FIRST TIME
export const serviceProviderInfo = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await serviceprovider.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ result, message: 'Submitted Successfully !' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//TAKE STARTING PRICE AND 3 BRAND PICS
export const serviceProviderInfoSP = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (isNaN(data.startingPrice)) {
    return res
      .status(404)
      .json({ message: 'Invalid input type for Starting Price !' });
  }

  try {
    const result = await serviceprovider.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ result, message: 'Submitted Successfully !' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//UPDATE HIRER
export const updatehirer = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  //if (!mongoose.Types.ObjectId.isValid(id))
  //return res.status(404).send(`No account with id: ${id}`);
  try {
    const result = await hirer.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ result, message: 'Update Successful !' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//SENDING FEEDBACK TO DATABASE
export const feedback = async (req, res) => {
  const { fullName, email, feedback } = req.body;

  const data = {
    fullName,
    email,
    feedback,
  };
  try {
    const result = await feedbackModel.create(data);

    res.status(200).json({ result, message: 'Thank you for your Feedback !' });
    console.log(result);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//UPDATE BRAND PICS
export const updatebrandpics = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await serviceprovider.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ result, message: 'Update Successful !' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//UPDATE STARTING PRICE
export const updatestartingprice = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (isNaN(data.startingPrice)) {
    return res.status(404).json({ message: 'Invalid input type !' });
  }

  try {
    const result = await serviceprovider.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ result, message: 'Update Successful !' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

//GET NUMBER OF STULANCERS IN THE DATABASE
export const getNumberofStuLancers = async (req, res) => {
  try {
    const result = await serviceprovider.countDocuments({});
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
