import Jwt from "jsonwebtoken";
import hirer from "../models/hirer.js";
import serviceprovider from "../models/serviceprovider.js";
import bcrypt from "bcrypt";
//SIGN UP CONTROLLER

export const signup = async (req, res) => {
  const { fullName, email, password, serviceType, profilePic } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await hirer.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "Email already exists" });

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
      "test",
      { expiresIn: "1hr" }
    );

    //SENDING RESPONSE
    res.status(200).json({ result, token });
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
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
    profilePic,
  } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await serviceprovider.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "Email already exists" });

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
      profilePic: profilePic,
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
        id: result._id,
      },
      "test",
      { exp: Date.now() / 1000 + 1 }
    );

    //SENDING RESPONSE
    res.status(200).json({ result, token });
    console.log(result);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//LOGIN CONTROLLER FOR HIRER

export const loginHirer = async (req, res) => {
  const { email, password } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await hirer.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "Email does not exist" });

    // //VERIFYING LOGIN PASSWORD
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test"
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//LOGIN CONTROLLER FOR SERVICE PROVIDER

export const loginServicer = async (req, res) => {
  const { email, password } = req.body;
  try {
    //CHECKING IF USER EXISTS
    const existingUser = await serviceprovider.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "Email does not exist" });

    // //VERIFYING LOGIN PASSWORD
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });

    //CREATING WEB TOKEN FOR USER
    const token = Jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test"
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//UPDATE SERVICE PROVIDER
export const updateserviceProvider = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  //if (!mongoose.Types.ObjectId.isValid(id))
  //return res.status(404).send(`No account with id: ${id}`);
  try {
    const result = await serviceprovider.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
