const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  console.log(req.headers.authorization);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (token) {
      const decodeData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = decodeData;
    }
  } catch (e) {
    console.log(e);
  }
  next();
}; 