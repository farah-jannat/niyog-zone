import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../../utils/datauri.js";
import cloudinary from "../../utils/cloudinary.js";

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

    const { profilePhoto, resume } = req.files;
    console.log(
      "Profile Photo file received by controller:",
      profilePhoto ? profilePhoto[0] : "No profile photo"
    );
    console.log(
      "Resume file received by controller:",
      resume ? resume[0] : "No resume"
    );
    // cloudinary will be here
    const resumeUri = getDataUri(resume);
    const profileUri = getDataUri(profilePhoto);

    const cloudResponse_resume = await cloudinary.uploader.upload(
      resumeUri.content
    );
    const cloudResponse_profile = await cloudinary.uploader.upload(
      profileUri.content
    );
    console.log("cloudResponse here :", cloudResponse_resume);
    console.log("cloudResponse here :", cloudResponse_profile);

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
      Profile: {
        profilePhoto: cloudResponse.secure_url,
      },
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

// export const updateProfile = async (req, res) => {
//   console.log("hello from u@@@@@@@@@@@@@@@@@@@@@@@@@@");
//   try {
//     const { fullName, email, phoneNumber, bio, skills } = req.body;

//     // const profile = req.profilePhoto;
//     // const { profilePhoto, resume } = req.files;

//     console.log("########## ", req.files["profilePhoto"]);

//     const profilePhoto =
//       req.files && req.files["profilePhoto"]
//         ? req.files["profilePhoto"][0]
//         : undefined;
//     const resume =
//       req.files && req.files["resume"] ? req.files["resume"][0] : undefined;

//     console.log(
//       "Profile Photo file received by controller:",
//       profilePhoto ? profilePhoto[0] : "No profile photo"
//     );
//     console.log(
//       "Resume file received by controller:",
//       resume ? resume[0] : "No resume"
//     );
//     // cloudinary will be here
//     const resumeUri = getDataUri(resume);
//     const profileUri = getDataUri(profilePhoto);

//     const cloudResponse_resume = await cloudinary.uploader.upload(
//       resumeUri.content
//     );
//     const cloudResponse_profile = await cloudinary.uploader.upload(
//       profileUri.content
//     );
//     console.log("cloudResponse here :", cloudResponse_resume);
//     console.log("cloudResponse here :", cloudResponse_profile);
//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",");
//     }
//     const userId = req.id; //middleware authentication
//     // console.log("this i user id", userId);
//     let user = await User.findOne({ _id: userId });
//     console.log("user resume is here", user?.Profile?.resume);
//     if (!user) {
//       return res.status(400).json({
//         message: "User not found.",
//         success: false,
//       });
//     }
//     console.log("here is the bio of mim :", bio);
//     // updating data
//     if (fullName) user.fullName = fullName;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.Profile.bio = bio;
//     if (skills) user.Profile.skills = skillsArray;

//     // resume comes later here...
//     if (cloudResponse_resume) {
//       user.Profile.resume = cloudResponse_resume.secure_url; // save the cloudinary url
//       user.Profile.resumeOriginalName = resume.originalname; // Save the original file name
//     }
//     if (cloudResponse_profile) {
//       user.Profile.profilePhoto = cloudResponse_profile.secure_url; // save the cloudinary url
//       // Save the original file name
//     }

//     await user.save();

//     user = {
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       Profile: user.Profile,
//     };
//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       user,
//       success: true,
//     });
//   } catch (err) {
//     console.log("error while updating Profile", err);
//   }
// };

// updateProfile

export const updateProfile = async (req, res) => {
  console.log("hello from u@@@@@@@@@@@@@@@@@@@@@@@@@@");
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    let profilePhotoFile;
    let resumeFile;

    // req.files will be an array when using .any()
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file) => {
        if (file.fieldname === "profilePhoto") {
          profilePhotoFile = file;
        } else if (file.fieldname === "resume") {
          resumeFile = file;
        }
      });
    }

    console.log(
      "Profile Photo file received by controller:",
      profilePhotoFile ? profilePhotoFile.originalname : "No profile photo"
    );
    console.log(
      "Resume file received by controller:",
      resumeFile ? resumeFile.originalname : "No resume"
    );

    let cloudResponse_resume;
    let cloudResponse_profile;

    // Only upload to Cloudinary if the file exists
    if (resumeFile) {
      const resumeUri = getDataUri(resumeFile); // Pass the actual file object
      cloudResponse_resume = await cloudinary.uploader.upload(
        resumeUri.content
      );
      console.log("Cloudinary response for resume:", cloudResponse_resume);
    }

    if (profilePhotoFile) {
      const profileUri = getDataUri(profilePhotoFile); // Pass the actual file object
      cloudResponse_profile = await cloudinary.uploader.upload(
        profileUri.content
      );
      console.log(
        "Cloudinary response for profile photo:",
        cloudResponse_profile
      );
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; //middleware authentication
    let user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // updating data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.Profile.bio = bio;
    if (skills) user.Profile.skills = skillsArray;

    // Update resume and profile photo URLs only if uploaded
    if (cloudResponse_resume) {
      user.Profile.resume = cloudResponse_resume.secure_url;
      user.Profile.resumeOriginalName = resumeFile.originalname;
    }
    if (cloudResponse_profile) {
      user.Profile.profilePhoto = cloudResponse_profile.secure_url;
      // No original name for profile photo? Add if needed.
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
    return res.status(500).json({
      message: "Error updating profile.",
      success: false,
      error: err.message, // Provide error message for debugging
    });
  }
};
