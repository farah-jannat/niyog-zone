import mongoose from "mongoose";

// const profileSchema = new mongoose.Schema({
//   bio: { type: String },
//   skills: [{ type: String }],
//   resume: { type: String },
//   resumeOriginalName: { type: String },
//   company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
//   profilePhoto: { type: String, default: "" },
// });

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    Profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
      profilePhoto: {
        type: String,

        default: "",
      },
    },
    // Profile: profileSchema,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
