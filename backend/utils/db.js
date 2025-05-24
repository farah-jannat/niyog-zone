import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected succesfully");
    const result = await User.updateMany(
      { fullname: { $exists: true } }, // Query: Find documents where 'fullname' field exists
      { $rename: { fullname: "fullName" } } // Update: Rename 'fullname' to 'fullName'
    );

    console.log(
      `Migration complete: ${result.matchedCount} documents matched, ${result.modifiedCount} documents modified.`
    );
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

export default connectDB;
