// graphql/resolvers/index.js (or wherever your resolvers are)

import bcrypt from "bcrypt";
import cloudinary from "cloudinary"; // Assuming you have configured cloudinary
import { User } from "../../models/user.model.js";
import getDataUri from "../../utils/datauri.js";

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

      // Basic validation
      if (!fullName || !email || !phoneNumber || !password || !role) {
        throw new Error("All required fields must be provided.");
      }

      // Handle file uploads
      // 'profilePhoto' and 'resume' are now Upload promises
      const uploadedProfilePhoto = profilePhoto ? await profilePhoto : null;
      const uploadedResume = resume ? await resume : null;

      let profilePhotoUrl = null;
      let resumeUrl = null;

      // Process profile photo
      if (uploadedProfilePhoto) {
        const { createReadStream, filename, mimetype, encoding } =
          uploadedProfilePhoto;
        const stream = createReadStream();
        const buffer = await new Promise((resolve, reject) => {
          const chunks = [];
          stream.on("data", (chunk) => chunks.push(chunk));
          stream.on("error", reject);
          stream.on("end", () => resolve(Buffer.concat(chunks)));
        });

        const profileUri = getDataUri(buffer, mimetype); // Adjust getDataUri to accept buffer and mimetype
        const cloudResponse_profile = await cloudinary.uploader.upload(
          profileUri.content
        );
        profilePhotoUrl = cloudResponse_profile.secure_url;
      }

      // Process resume
      if (uploadedResume) {
        const { createReadStream, filename, mimetype, encoding } =
          uploadedResume;
        const stream = createReadStream();
        const buffer = await new Promise((resolve, reject) => {
          const chunks = [];
          stream.on("data", (chunk) => chunks.push(chunk));
          stream.on("error", reject);
          stream.on("end", () => resolve(Buffer.concat(chunks)));
        });

        const resumeUri = getDataUri(buffer, mimetype); // Adjust getDataUri to accept buffer and mimetype
        const cloudResponse_resume = await cloudinary.uploader.upload(
          resumeUri.content
        );
        resumeUrl = cloudResponse_resume.secure_url;
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        Profile: {
          profilePhoto: profilePhotoUrl, // Use the uploaded URL
          resume: resumeUrl, // Use the uploaded URL
        },
      });

      return newUser; // Return the created user object
    } catch (err) {
      console.error("Error while registering:", err);
      // Throw a GraphQL error that clients can understand
      throw new Error(
        `Registration failed: ${err.message || "An unknown error occurred."}`
      );
    }
  },
};

// Ensure getDataUri utility function is adapted if it only took 'req.files' before.
// Example getDataUri adaptation:
// function getDataUri(buffer, mimetype) {
//   const DataUriParser = require('datauri/parser'); // npm install datauri
//   const parser = new DataUriParser();
//   return parser.format(mimetype, buffer);
// }
// Or a simpler custom implementation if you prefer:
// function getDataUri(buffer, mimetype) {
//   return { content: `data:${mimetype};base64,${buffer.toString('base64')}` };
// }
