const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

// registration
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate a random token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "buyer",
      verificationToken,
    });

    await newUser.save();

    // verification email utility
    sendVerificationEmail(email, verificationToken);

    // const url = `http://localhost:5173/verify-email/${verificationToken}`;

    // await sendEmail({
    //   from: `"Support" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: "Verify Your Email",
    //   html: `
    //     <h3>Welcome!</h3>
    //     <p>Please click the link below to verify your account:</p>
    //     <a href="${url}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Verify Email</a>
    //   `,
    // });

    console.log("Signup Successfully");
    res
      .status(201)
      .json({ message: "Signup successful! Please verify your account." });
  } catch (error) {
    console.log("Signup not done", error);
    res.status(500).json({
      error:
        error.message || "Internal Server Error, Kindly Try After Some Time",
    });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = req.user;

    const {
      password,
      __v,
      resetPasswordToken,
      verificationToken,
      ...userDetails
    } = userExist._doc;

    // jwt token
    // const token = jwt.sign(
    //   {
    //     id: userExist._id,
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" },
    // );

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // setup jwt in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
      user: userDetails,
      message: "Login Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed at token generation" });
  }
};

// email verification system
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    // find user by token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Account already verified" });
    }

    // update verification status and clear the token
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    console.log(`Email verified for user: ${user.email}`);
    res
      .status(200)
      .json({ message: "Email verified successfully! You can now login." });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
};

// resend verification email
const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found with this email." });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "This account is already verified. Please login." });
    }

    // generate new token for resend verification
    const newVerificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = newVerificationToken;
    await user.save();

    sendVerificationEmail(user.email, newVerificationToken);
    res
      .status(200)
      .json({ message: "Verification email resent! Please check your inbox." });
  } catch (error) {
    console.error("Resend Email Error:", error);
    res.status(500).json({ error: "Failed to resend verification email." });
  }
};

// forget password
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User with this email not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"My Awesome App" <noreply@yourapp.com>',
      // from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `
       <h3>Welcome!</h3>
        <p>Please click the link below to reset your password</p>
        <a href="${resetUrl}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Reset Password</a>
      `,
    });

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something is wrong, try again", message: error.message });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

// logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User Logout Successfully" });
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerificationEmail,
  forgetPassword,
  resetPassword,
  logout,
};
