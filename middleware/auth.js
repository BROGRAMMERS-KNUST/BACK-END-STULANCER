import Jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("", [1]);
    let decodedData = Jwt.verify(token, "test");
    req.userId = decodedData.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
