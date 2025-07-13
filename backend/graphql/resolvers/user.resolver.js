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
};
