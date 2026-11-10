const express = require("express");
const router = express.Router();

const {
  signupValidation,
  loginValidation,
  verifyToken,
} = require("../middleware/authMiddleware");
const {
  register,
  login,
  verifyEmail,
  resendVerificationEmail,
  forgetPassword,
  resetPassword,
  logout,
} = require("../controllers/authController");

router.post("/signup", signupValidation, register);
router.post("/login", loginValidation, login);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logout);

module.exports = router;
