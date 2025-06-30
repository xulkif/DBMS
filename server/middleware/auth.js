const jwt = require("jsonwebtoken");
const checkUserStatus = require("./checkUserStatus");

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No authentication token, access denied"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check user status
    await checkUserStatus(req, res, next);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token is not valid"
    });
  }
};

module.exports = auth; 