// const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken"); // ← Add this line
const User = require("../models/UserModels");
const bcrypt = require("bcryptjs");

// signup validation
const signupValidation = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password Should 6 Characters long" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ error: "User Already Exist, kindly Login" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Validation error occure" });
  }
};

// login validation
const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const userExist = await User.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(404).json({ error: "User Not Exist Kindly Signup" });
    }

    if (!userExist.isVerified) {
      return res
        .status(401)
        .json({ error: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    req.user = userExist;
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
};

// verify token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. Please login." });
  }

  try {
    //Check the token is valid using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// const verifyToken = (req, res, next) => {
//   console.log("Cookies found in request:", req.cookies); // LOG 1

//   // Check Authorization header first (Bearer token)
//   let token = req.headers.authorization?.split(' ')[1];

//   // Fallback to cookie
//   if (!token) {
//     token = req.cookies.token;
//   }

//   if (!token) {
//     console.log("No token found in header or cookies!"); // LOG 2
//     return res.status(401).json({ error: "Access denied. Please login." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token Data:", decoded); // LOG 3
//     req.user = { id: decoded.id };
//     next();
//   } catch (error) {
//     console.log("JWT Verification Failed:", error.message);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

module.exports = { signupValidation, loginValidation, verifyToken };
