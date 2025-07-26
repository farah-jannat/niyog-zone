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
      console.log("imageeeeeeeeeeeeeeeeeeeeeeeee", profilePhoto);
      // handle profile photo

      let uploadPhotoResult;
      if (profilePhoto) {
        const profilePublicId = crypto.randomUUID();
        // let uploadPhotoResult;
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
      } else {
        console.log("no profile photo");
      }
      // handle resume
      let uploadPdfResult;

      if (resume) {
        const resumePublicId = crypto.randomUUID();
        // let uploadPdfResult;
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
      } else {
        console.log("no resume");
      }
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
      // console.log("data", email, password, role);
      // validate Data
      if (!email || !password || !role) {
        throw new Error("All required fields must be provided.");
      }
      // ** --- working here --
      
      let user = await User.findOne({ email }).populate({
        path: "Profile.company",
        options: { sort: { createdAt: -1 } },
      });
      if (!user) throw new Error("User not found.");

      console.log("user is ", user);

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new Error("password does not match");

      // check role is correct or not
      if (role !== user.role) {
        throw new Error("Account doesn't exist with current role.");
      }
      // console.log("userrerererr from logoin", user);
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
    // Extract data
    const {
      fullName,
      email,
      phoneNumber,
      bio,
      skills,
      userId,
      profilePhoto,
      resume,
    } = updateInput;

    // Find user
    // console.log(
    //   "update input console %%%%%%%%%%%%%%%%%%%%%%",
    //   fullName,
    //   email,
    //   phoneNumber,
    //   bio,
    //   skills,
    //   userId,
    //   profilePhoto,
    //   resume
    // );
    let user = await User.findOne({ _id: userId });
    console.log("phorifle####################", resume);
    // Handle Profile Photo
    let uploadPhotoResult = user.Profile?.profilePhoto; // Access existing profilePhoto safely

    if (profilePhoto && user.Profile?.profilePhoto !== profilePhoto) {
      // Check if new profilePhoto is provided and different
      const profilePublicId = crypto.randomUUID();
      try {
        uploadPhotoResult = await uploads(
          profilePhoto,
          `${profilePublicId}`,
          true,
          true
        );
      } catch (error) {
        console.error("Upload error:", error?.message || error);
        throw new Error("Image upload error. Try again.");
      }

      if (!uploadPhotoResult.public_id)
        throw new Error("Image upload error. Try again.");
    }

    // Handle resume pdf
    let uploadPdfResult = user.Profile?.resume; // Access existing resume safely
    if (resume && user.Profile?.resume !== resume) {
      // Check if new resume is provided and different
      const resumePublicId = crypto.randomUUID();
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
    }

    // Prepare top-level updates
    const updates = {};
    if (fullName !== undefined) updates.fullName = fullName;
    if (email !== undefined) updates.email = email;
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;

    // Prepare Profile updates
    const profileUpdates = {};
    if (bio !== undefined) profileUpdates.bio = bio;
    if (skills !== undefined) profileUpdates.skills = skills;
    if (uploadPhotoResult !== undefined)
      profileUpdates.profilePhoto = uploadPhotoResult?.secure_url;
    if (uploadPdfResult !== undefined)
      profileUpdates.resume = uploadPdfResult?.secure_url;

    // Merge top-level properties
    Object.assign(user, updates);

    // Initialize Profile if it doesn't exist
    if (!user.Profile) {
      user.Profile = {};
    }

    // Merge Profile properties deeply
    Object.assign(user.Profile, profileUpdates);

    // Update it
    await user.save();
    return user; // Return the updated user object
  },

  // logout
};
