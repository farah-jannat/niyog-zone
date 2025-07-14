import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { uploads } from "../../utils/new-cloudinary.js";

export const userMutations = {
  async register(_, { registerInput }, context) {
    try {
      const {
        fullName,
        email,
        phoneNumber,
        password,
        role,
        profilePhoto,
        resume,
      } = registerInput;

      // validate Data
      if (!fullName || !email || !phoneNumber || !password || !role) {
        throw new Error("All required fields must be provided.");
      }

      // find the suer
      const userExists = await User.findOne({ email });
      if (userExists) throw new Error("User already exists.");

      // handle profile photo
      const profilePublicId = crypto.randomUUID();
      let uploadPhotoResult;
      try {
        uploadPhotoResult = await uploads(
          profilePhoto,
          `${profilePublicId}`,
          true,
          true
        );
      } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Image upload error. Try again.");
      }

      if (!uploadPhotoResult.public_id)
        throw new Error("Image upload error. Try again.");

      // handle resume
      const resumePublicId = crypto.randomUUID();
      let uploadPdfResult;
      try {
        uploadPdfResult = await uploads(
          resume,
          `${resumePublicId}`,
          true,
          true
        );
      } catch (error) {
        console.error("Pdf Upload error:", error);
        throw new Error("Pdf upload error. Try again.");
      }

      if (!uploadPdfResult.public_id)
        throw new Error("Pdf upload error. Try again.");

      // has the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // save the user
      const newUser = await User.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        Profile: {
          profilePhoto: uploadPhotoResult?.secure_url,
          resume: uploadPdfResult?.secure_url,
        },
      });

      return newUser;
    } catch (err) {
      console.error("Error while registering:", err);
      throw new Error(
        `Registration failed: ${err.message || "An unknown error occurred."}`
      );
    }
  },

  async login(_, { loginInput }, context) {
    try {
      const { email, password, role } = loginInput;
      console.log("data", email, password, role);
      // validate Data
      if (!email || !password || !role) {
        throw new Error("All required fields must be provided.");
      }

      // find the user
      let user = await User.findOne({ email });
      if (!user) throw new Error("User not found.");

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new Error("password does not match");

      // check role is correct or not
      if (role !== user.role) {
        throw new Error("Account doesn't exist with current role.");
      }

      return user;
    } catch (err) {
      console.error("Error while login:", err);
      throw new Error(
        `login failed: ${err.message || "An unknown error occurred."}`
      );
    }
  },
  // update not donep
  async update(_, { updateInput }, context) {
    try {
      const { fullName, email, phoneNumber, bio, skills, photo } = updateInput;

      // handle profile photo
      const profilePublicId = crypto.randomUUID();
      let uploadPhotoResult;
      try {
        uploadPhotoResult = await uploads(
          profilePhoto,
          `${profilePublicId}`,
          true,
          true
        );
      } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Image upload error. Try again.");
      }

      if (!uploadPhotoResult.public_id)
        throw new Error("Image upload error. Try again.");




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


      // Object.assign(user, updateInput)



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
  },

  // logout
};
