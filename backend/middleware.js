const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./config");

const authMiddleware = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer" || !token) throw new Error();
    const verified = jwt.verify(token, jwtSecret);

    const { userId } = verified;
    if (userId) {
      req.userId = userId;
      return next();
    }
    return res.status(403).json({});
  } catch (error) {
    return res.status(403).json({});
  }
};

module.exports = { authMiddleware };
