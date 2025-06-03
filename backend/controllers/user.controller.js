import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      // console.log("fullName is", fullName);
      // console.log("emial is", email);
      // console.log("phoneNumber is", phoneNumber);
      // console.log("password is", password);
      // console.log("role is", role);
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const file = req.file;
    console.log("resume file name :", file);
    // cloudinary will be here
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // console.log("cloudResponse here :", cloudResponse);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      Profile:{
        profilePhoto:cloudResponse.secure_url
      }
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (err) {
    console.log("error while registaring", err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect user or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect user or password",
        success: false,
      });
    }

    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.Profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullName}`,
        user,
        succes: true,
      });
  } catch (err) {
    console.log("error while logging user", err);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log("error while logging out", err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    console.log("resume file name :", file);
    // cloudinary will be here
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // console.log("cloudResponse here :", cloudResponse);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware authentication
    // console.log("this i user id", userId);
    let user = await User.findOne({ _id: userId });
    console.log("user resume is here", user?.Profile?.resume);
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    console.log("here is the bio of mim :", bio);
    // updating data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.Profile.bio = bio;
    if (skills) user.Profile.skills = skillsArray;

    // resume comes later here...
    if (cloudResponse) {
      user.Profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.Profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.Profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (err) {
    console.log("error while updating Profile", err);
  }
};
