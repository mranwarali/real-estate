const User = require("../models/UserModels");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const cloudinary = require("cloudinary").v2;

// fetch profile details
const fetchProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -verificationToken",
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// fetch agents propfile

const fetchAgents = async (req, res) => {
  try {
    const agent = await User.find({ role: "agent" }).select(
      "-password -verificationToken",
    );
    if (!agent) {
      return res.status(404).json({ error: "agent not found" });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name, email, phone, gender, dob } = req.body;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          error: "Email already in use, Try with another email",
        });
      }

      user.email = email;
      user.isVerified = false;
      const token = crypto.randomBytes(32).toString("hex");
      user.verificationToken = token;
      sendVerificationEmail(email, token);
    }

    // if (req.file) {
    //   user.avatar = req.file.path;
    // }

    if (req.file) {
      if (user.avatar && user.avatar.includes("cloudinary")) {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      user.avatar = req.file.path;
    }

    // if (req.file) {
    //   if (user.avatar && user.avatar.includes("cloudinary")) {
    //     const parts = user.avatar.split("/");
    //     const fileName = parts.pop().split(".")[0];
    //     const folderName = parts.slice(-1)[0];

    //     await cloudinary.uploader.destroy(`${folderName}/${fileName}`);
    //   }
    //   user.avatar = req.file.path;
    // }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    // if (req.file) user.avatar = req.file.path;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User Profile Updated Successfully",
      // user: {
      //   id: updatedUser._id,
      //   name: updatedUser.name,
      //   email: updatedUser.email,
      //   phone: updatedUser.phone,
      //   avatar: updatedUser.avatar,
      // },
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error during update" });
  }
};

// delete profile
const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Somethiong is wrong, Try again" });
  }
};

// change password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Current and new passwords are required" });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect current password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Update Password Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error while saving new password" });
  }
};

module.exports = {
  fetchProfile,
  fetchAgents,
  updateProfile,
  deleteProfile,
  changePassword,
};
