const jwt = require("jsonwebtoken")
const {secret} = require("../config")

module.exports = function (req, res, next) {
  console.log(req.headers.authorization);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (token) {
      const decodeData = jwt.verify(token, secret);
      req.user = decodeData;
    }
  } catch (e) {
    console.log(e);
  }
  next();
}; 