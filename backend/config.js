const jwtSecret = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGODB_URL;

module.exports = { jwtSecret, mongoUrl };
